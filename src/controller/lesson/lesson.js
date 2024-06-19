const db = require("../../models");
const fs = require('fs');
const axios = require('axios');
const Bull = require('bull');
const ApiError = require("../../helpers/apiError");
const path = require('path');
const ApiResponser = require("../../helpers/apiResponser");

let clients = [];
// SSE endpoint configuration middleware
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
const uploadQueue = new Bull('uploadQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
        maxRetriesPerRequest: null
    }
});

async function addLesson(req, res, next) {
    console.log(req.file)
    try {
        const lessonData = {
            title: req.body.title,
            alt_title: req.body.alt_title,
            description: req.body.description,
            alt_description: req.body.alt_description,
            course_id: req.body.course_id,
            duration: req.body.duration,
            is_free: req.body.is_free,
        };
        // console.log(lessonData)

        if (!req.file) throw new ApiError('  الملف لا يجب ان يكون فارغ')

        const filePath = req.file.path
        console.log("file path ", filePath)
        const job = await uploadQueue.add({ lessonData, filePath });
        console.log(job.data)
        return new ApiResponser(res, { "job_id": job.id })

    } catch (error) {
        next(error)
    }
}
uploadQueue.process(async (job, done) => {
    try {
        const { lessonData, filePath } = job.data; // Assume filePath is passed when adding the job
        const fileStream = fs.createReadStream(filePath); // Create read stream from file
        const videoUrl = await uploadToVimeoChunks(fileStream);
        lessonData.video_url = videoUrl
        console.log(lessonData)
        await saveLesson(lessonData)
        done(null, { videoUrl });

    } catch (error) {
        done(error);
    }
});
uploadQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error ${err.message}`);
    throw new Error('failed')
});
async function uploadToVimeoChunks(fileStream) {
    try {
        const fileSize = await getStreamSize(fileStream)
        const initializeResponse = await axios.post(
            'https://api.vimeo.com/me/videos',
            {
                upload: {
                    approach: 'tus',
                    size: fileSize
                }
            },
            {
                headers: {
                    'Authorization': `Bearer 9db074d2025c7c8b89da3094894c8309`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const uploadLink = initializeResponse.data.upload.upload_link;
        const videoUri = initializeResponse.data.link;

        // console.log(fileStream)
        const chunkSize = 10 * 1024 * 1024; // 10MB chunk size
        let start = 0;
        let chunkNumber = 0;

        for await (const chunk of chunkStream(fileStream, chunkSize)) {
            const retries = 3
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    console.log(`Uploading chunk ${++chunkNumber} starting at ${start}`);
                    await axios.patch(uploadLink, chunk, {
                        headers: {
                            'Tus-Resumable': '1.0.0',
                            'Upload-Offset': start.toString(),
                            'Content-Type': 'application/offset+octet-stream',
                            Accept: 'application/vnd.vimeo.*+json;version=3.4',
                        },
                    });
                    start += chunk.length;
                    const progress = Math.round((start / fileSize) * 100);
                    clients.forEach(client => {
                        client.write(`data: ${progress}\n\n`);
                    });
                    console.log(`Progress: ${progress}%`);
                    break;
                } catch (error) {
                    if (attempt === retries) {
                        console.error(`Failed to upload chunk after ${retries} attempts:`, error);
                        throw new Error('فشل التحميل الرجاء اعادة المحاولة ');
                    }
                    console.error(`Error uploading chunk ${chunkNumber}:`, error);
                    await delay((2 ** attempt) * 100); // delay before retrying
                }
            }
        }
        console.log('Upload completed successfully!');
        return videoUri
    } catch (error) {
        console.error('Failed to upload to Vimeo:', error);
        throw new Error('فشل تحميل الفيديو ');
    }
}

// Helper function to split stream into chunks
async function* chunkStream(stream, chunkSize) {
    let buffer = Buffer.alloc(0);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
        while (buffer.length >= chunkSize) {
            yield buffer.slice(0, chunkSize);
            buffer = buffer.slice(chunkSize);
        }
    }
    if (buffer.length) yield buffer; // Yield remaining buffer
}
// Helper function to get the size of the stream
async function getStreamSize(stream) {
    const fileStat = await fs.promises.stat(stream.path);
    return fileStat.size;
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function saveLesson(lessonData) {
    try {
        const lesson = await db.Lesson.create(lessonData)
        return lesson;
    } catch (error) {
        throw new Error("لم يتم حفظ الدرس ")
    }
}



module.exports = {
    addLesson,
    sseConfig,
    uploadToVimeoChunks,
}