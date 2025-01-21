const socketIo = require('socket.io');
const http = require('http'); // Make sure you're using the same server instance
const db = require('../models'); // Assuming Enrollment is part of your models

// Function to get enrolled student count
async function getEnrolledStudentsCount(status = null) {
    try {
        let query = {};

        // If a status is provided, filter by status (e.g., 'pending')
        if (status) {
            query.status = 'pending'; // Replace 'pending' with the value passed
        }

        // Get the count of records in the Enrollment model that match the query
        const count = await db.Enrollment.countDocuments(query);
        return count;
    } catch (error) {
        console.error('Error fetching enrollment count:', error);
        return 0; // Return 0 if an error occurs
    }
}

// Function to initialize the WebSocket server
const setupSocketServer = (server) => {
    // Setup socket.io with an HTTP server
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New client connected');

        // Send the current count of enrolled students to the client
        getEnrolledStudentsCount().then((count) => {
            socket.emit('update_enrolled', count);
        });

        // Listen for the 'student_enrolled' event when a new student enrolls
        socket.on('student_enrolled', () => {
            const newEnrollment = new db.Enrollment({
                // Replace with actual data from the client or backend
                studentId: 'some-student-id',
                examId: 'some-exam-id',
                status: 'pending', // Assuming the status is 'pending' initially
            });

            // Save the new enrollment to the database
            newEnrollment.save()
                .then(() => {
                    // After saving, get the updated count and emit it to all clients
                    getEnrolledStudentsCount().then((count) => {
                        io.emit('update_enrolled', count); // Emit the updated count to all clients
                    });
                })
                .catch((err) => {
                    console.error('Error saving enrollment:', err);
                });
        });

        // Handle client disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = setupSocketServer;
