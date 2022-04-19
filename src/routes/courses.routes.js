const router = require('express-promise-router')();
const courseController = require('../controllers/courses.controller');

router.get('/get_courses/:instructor_id', courseController.getCourses);
router.get('/get_assignments/:course_id', courseController.getAssignments);

module.exports = router;