const db = require("../../models");
const ApiResponser = require("../../helpers/apiResponser");
const ApiError = require("../../helpers/apiError");

async function createNewExam(req, res, next) {
  try {
    let {
      title,
      alt_title,
      start_date,
      end_date,
      duration,
      lesson_id,
      course_id,
      class_id,
      teacher_id,
      questions,
    } = req.body;
    let answers = [];

    const { id, user_type } = req.user || {};

    if (user_type === "teacher") {
      teacher_id = id;
    }

    const [teacher, course, currentClass, lesson] = await Promise.all([
      db.User.findOne({ where: { id: teacher_id, user_type: "teacher" } }),
      db.Course.findOne({ where: { id: course_id } }),
      db.Class.findOne({ where: { id: class_id } }),
      db.Lesson.findOne({ where: { id: lesson_id } }),
    ]);

    if (!teacher || !course || !currentClass || !lesson)
      throw new ApiError(
        {
          lesson_id: !lesson ? req.t("invalidId") : undefined,
          course_id: !course ? req.t("invalidId") : undefined,
          class_id: !currentClass ? req.t("invalidId") : undefined,
          teacher_id: !teacher ? req.t("invalidId") : undefined,
        },
        422
      );

    const result = await db.sequelize.transaction(async (transaction) => {
      const exam = await db.Exam.create(
        {
          title,
          alt_title,
          start_date: start_date ? new Date(start_date) : null,
          end_date: end_date ? new Date(end_date) : null,
          duration: parseFloat(duration || 0),
          lesson_id,
          course_id,
          class_id,
          teacher_id,
        },
        { transaction }
      );

      let examQuestions = questions.map((question) => ({
        ...question,
        duration: parseFloat(question.duration || 0),
        degree: parseFloat(question.degree || 0),
        exam_id: exam?.id,
      })); // answers includes

      const createdQuestions = await db.Question.bulkCreate(examQuestions, {
        transaction,
      }); // id included

      const examAnswers = examQuestions.map((question, index) => {
        const storedQuestion = createdQuestions[index];
        let answers = question.answers.map((answer) => {
          return {
            ...answer,
            question_id: storedQuestion?.id,
            exam_id: exam?.id,
          };
        });

        return answers;
      });

      answers = new Array().concat(...examAnswers);

      const createdAnswers = await db.Answer.bulkCreate(answers, {
        transaction,
      });

      return { exam, questions: createdQuestions, answers: createdAnswers };
    });

    return new ApiResponser(res, result);
  } catch (error) {
    next(error);
  }
}

async function startExam(req, res, next) {
  try {
    const { id: exam_id } = req.params;
    // const { id} = req.user;
    const id = 5;

    if (!exam_id) throw new ApiError(req.t("examIsRequired"), 422);

    const exam = await db.Exam.findOne(
      {
        where: { id: exam_id },
        include: [
          {
            model: db.Question,
            as: "questions",
            include: [
              {
                model: db.Answer,
                as: "answers",
                attributes: {
                  exclude: ["is_correct"],
                },
              },
            ],
          },
          {
            model: db.Class,
            as: "class",
          },
          {
            model: db.User,
            as: "teacher",
            attributes: {
              exclude: ["password", "role_id"],
            },
          },
        ],
      },
      { raw: true }
    );

    if (!exam) throw new ApiError(req.t("invalidExam"), 422);

    // throw an error if student already joined to current exam
    const existedStudentExam = await db.StudentExam.findOne(
      { where: { student_id: id, teacher_id: exam?.teacher_id, exam_id } },
      { raw: true }
    );

    if (existedStudentExam)
      throw new ApiError(req.t("studentExamExisted"), 422);

    const result = await db.sequelize.transaction(async (transaction) => {
      const studentExam = await db.StudentExam.create(
        {
          exam_id,
          student_id: id,
          teacher_id: exam.teacher_id,
        },
        { transaction }
      );

      const questions = exam.questions?.map((question) => ({
        exam_id: studentExam.id,
        degree: 0,
        duration: 0,
        student_id: id,
        teacher_id: exam.teacher_id,
        question_id: question.id,
        answer_id: null,
      }));

      const studentQuestions = await db.StudentExamQuestions.bulkCreate(
        questions,
        { transaction }
      );

      return { studentQuestions, studentExam };
    });

    return new ApiResponser(res, exam);
  } catch (error) {
    next(error);
  }
}

async function correctExam(req, res, next) {
  try {
    const { exam_id, questions } = req.body;
    // const { id } = req.user;
    const id = 5;
    let degree = 0,
      duration = 0;

    const studentExam = await db.StudentExam.findOne(
      {
        where: { exam_id, student_id: id },
        include: [
          {
            model: db.Exam,
            as: "exam",
            include: [
              {
                model: db.Question,
                as: "questions",
                include: [
                  {
                    model: db.Answer,
                    as: "answers",
                  },
                ],
              },
            ],
          },
          {
            model: db.StudentExamQuestions,
            as: "questions",
          },
        ],
      },
      { raw: true }
    );

    if (!studentExam) throw new ApiError(req.t("invalidExam"), 422);

    const result = await db.sequelize.transaction(async (transaction) => {
      //  update student exam questions
      const examQuestions = await Promise.all(
        questions?.map(async (question) => {
          const originQuestion = studentExam.exam?.questions?.find(
            (item) => item.id == question?.question_id
          );
          const answer = originQuestion?.answers?.find(
            (item) => item.id == question.answer_id
          );

          const is_correct = !!answer?.is_correct;
          const questionDegree = is_correct ? originQuestion?.degree : 0;

          degree += questionDegree;

          await db.StudentExamQuestions.update(
            {
              degree: questionDegree,
              is_correct,
              duration: question.duration,
              answer_id: question.answer_id,
            },
            { where: { id: question.id, student_id: id } },
            { transaction }
          );
        })
      );

      // update student exam result
      studentExam.degree = degree;
      studentExam.status = "completed";
      await studentExam.save({ transaction });
    });

    return new ApiResponser(res, "Exam corrected successfully!");
  } catch (error) {
    next(error);
  }
}

async function getStudentExam(req, res, next) {
  try {
    const { id } = req.params;
    // const { id: student_id } = req.user;
    const student_id = 5;

    const studentExam = await db.StudentExam.findOne({
      where: {
        id,
        student_id,
      },
      include: [
        {
          model: db.Exam,
          as: "exam",
          attributes: ["title", "alt_title", "id"],
        },
        {
          model: db.User,
          as: "teacher",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: db.User,
          as: "student",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: db.StudentExamQuestions,
          as: "questions",
          include: [
            {
              model: db.Question,
              as: "question",
              include: [{
                model: db.Answer,
                as: "answers",
                where: {
                  is_correct: true
                }
              }]
            },
            {
              model: db.Answer,
              as: "answer",
            },
          ],
        },
      ],
    });

    return new ApiResponser(res, studentExam);
  } catch (error) {
    next(error);
  }
}

module.exports = { createNewExam, startExam, correctExam, getStudentExam };
