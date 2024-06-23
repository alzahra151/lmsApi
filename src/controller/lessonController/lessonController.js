const db = require("../../models");
const ApiError = require("../../helpers/apiError")
const ApiResponser = require("../../helpers/apiResponser")
let Vimeo = require('vimeo').Vimeo;
const { PassThrough } = require('stream');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Bull = require('bull');
let client = new Vimeo(
  "c38c40edbd93c2eafa4df06a87a9803020f05b93",
  "ND7S6lGMtBaafxXF0cy7JPTe2S05kBuuauiJwejE7gxX051FuA/07oY971mkj4rtj2nGAKQ+VF4uAmVxefNHKUw9hN8JJy4gOBCPbE53yvs8snxsryfOA0VpbLVrqqLg",
  "9db074d2025c7c8b89da3094894c8309");

async function getAllLessons(req, res, next) {
  try {
    const lessons = await db.Lesson.findAll();
    return new ApiResponser(res, lessons)
  } catch (error) {
    next(error);
  }
}
async function getLessonById(req, res, next) {
  const lessonId = req.params.id;
  console.log(lessonId)
  try {
    const lesson = await db.Lesson.findByPk(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'lesson not found' });
    }
    return new ApiResponser(res, lesson)
  } catch (error) {
    next(error);
  }
}
let clients = [];

// SSE endpoint
async function sseConfig(req, res, next) {
  console.log('sse', clients)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  // Add client to the clients array
  clients.push(res);

  // Remove client from the clients array when connection closes
  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
}
async function addLesson(req, res, next) {
  try {
    const lessonData = {
      title: req.body.title,
      alt_title: req.body.alt_title,
      description: req.body.description,
      alt_description: req.body.alt_description,
      course_id: req.body.course_id,
      video_url: req.body.video_url,
      duration: req.body.duration,
      is_free: req.body.is_free,
    };
    // console.log(lessonData)
    const lesson = await db.Lesson.create(lessonData)
    return new ApiResponser(res, { lesson })

  } catch (error) {
    next(error)
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
    return new ApiResponser(res, lesson)
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
    return new ApiResponser(res, lesson)
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
  sseConfig
};
