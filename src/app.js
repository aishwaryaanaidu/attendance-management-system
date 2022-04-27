const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();


const index = require('./routes/index');
const registrationRoute = require('./routes/registration.routes');
const assignmentRoute = require('./routes/assignment.routes');
const studentRoute = require('./routes/student.routes');
const courseRoute = require('./routes/courses.routes');
const submissionsRoute = require('./routes/submissions.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(fileUpload());

app.use(index);
app.use('/api/', registrationRoute);
app.use('/api/assignment/', assignmentRoute);
app.use('/api/student/', studentRoute);
app.use('/api/courses/', courseRoute);
app.use('/api/submissions/', submissionsRoute);

module.exports = app;