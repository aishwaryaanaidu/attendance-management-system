const router = require('express-promise-router')();
const assignmentController = require('../controllers/assignment.controller');

router.post('/create', assignmentController.createAssignment);
router.post('/get_students', assignmentController.getStudents);
router.post('/get_assignments', assignmentController.getAssignments);

module.exports = router;