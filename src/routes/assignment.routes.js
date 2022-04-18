const router = require('express-promise-router')();
const assignmentController = require('../controllers/assignment.controller');

router.post('/create', assignmentController.createAssignment);
router.post('/get_students', assignmentController.getStudents);
router.post('/get_assignments', assignmentController.getAssignments);
router.post('/get_assignments_by_course', assignmentController.getAssignmentsAssociatedWithCourse);

module.exports = router;