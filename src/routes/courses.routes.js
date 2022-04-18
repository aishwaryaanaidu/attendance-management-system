const router = require('express-promise-router')();
const courseController = require('../controllers/courses.controller');

router.get('/get_courses', courseController.getCourses);
router.get('/get_assignments', courseController.getAssignments);

module.exports = router;