const router = require('express-promise-router')();
const studentController = require('../controllers/student.controller');

router.post('/get_students', studentController.getCourses);
router.post('/get_course_names', studentController.getCourseNames);

module.exports = router;