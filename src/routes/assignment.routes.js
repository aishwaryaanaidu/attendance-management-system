const router = require('express-promise-router')();
const assignmentController = require('../controllers/assignment.controller');

router.post('/create', assignmentController.createAssignment);
router.get('/get_students/:id', assignmentController.getStudents);
router.post('/get_assignments', assignmentController.getAssignments);
router.get('/get_assignments_by_course/:id', assignmentController.getAssignmentsAssociatedWithCourse);

module.exports = router;

// id: submission_id,
// title: assignment name
// description: assignment_desc
// label: course_name