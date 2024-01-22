const db = require("../../models");
const ApiError = require("../../helpers/apiError")
const ApiResponser = require("../../helpers/apiResponser")

async function getAllLessons(req, res, next) {
  try {
    const lessons = await db.Lesson.findAll();
    return new ApiResponser(res,  lessons )
  } catch (error) {
    next(error);
  }
}

async function getLessonById(req, res, next) {
  const lessonId = req.params.id;

  try {
    const lesson = await db.Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'lesson not found' });
    }
    return new ApiResponser(res,  lesson )
  } catch (error) {
    next(error);
  }
}

async function addLesson(res, res, next) {

  try {
    const lesson = await db.Lesson.create(req.body);
    return new ApiResponser(res,  lesson )
  } catch (error) {
    next(error);
  }
}
async function updateLessonById(req, res, next) {
  const lessonId = req.params.id;

  try {
    const lesson = await db.Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'lesson not found' });
    }

    await lesson.update(req.body);
    return new ApiResponser(res,  lesson )
  } catch (error) {
    next(error);
  }
}
async function deleteLessonById(req, res, next) {
  const lessonId = req.params.id;

  try {
    const lesson = await db.Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'lesson not found' });
    }

    await lesson.destroy();
    return new ApiResponser(res,  lesson )
  } catch (error) {
    next(error);
  }
}



module.exports = {
  getAllLessons,
  getLessonById,
  addLesson,
  updateLessonById,
  deleteLessonById,
};
