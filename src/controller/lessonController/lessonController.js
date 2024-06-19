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
  const data = req.body
  console.log(req.file)
  let file_name = req.file.path

  let uploadPercentage = 0;
  console.log(req.file)
  try {

    client.upload(
      file_name,
      {
        'name': 'Untitled',
        'description': 'The description goes here.'
      },
      async function (uri) {
        console.log('Your video URI is: ' + uri);

        client.request(uri + '?fields=link', async function (error, body, statusCode, headers) {
          if (error) {
            console.log('There was an error making the request.')
            console.log('Server reported: ' + error)
            return ``
          }
          console.log('Your video link is: ' + body.link)
          data.video_url = body.link
          const lesson = await db.Lesson.create(data);
          // res.status(200).json(lesson);
        })
      },
      function (bytes_uploaded, bytes_total) {
        uploadPercentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
        console.log(bytes_uploaded, bytes_total, uploadPercentage + '%')

        // Send progress update using SSE
        clients.forEach(client => {
          client.write(`data: ${uploadPercentage}\n\n`);
          console.log(uploadPercentage)
        });
      },
      function (error) {

        console.log('Failed because: ' + error)
      },
    )
    res.status(200).json('upload started');
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
