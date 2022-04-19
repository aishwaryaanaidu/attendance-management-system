const router = require('express-promise-router')();
const assignmentController = require('../controllers/assignment.controller');

router.post('/create', assignmentController.createAssignment);
router.get('/get_students/:id', assignmentController.getStudents);
router.post('/get_assignments', assignmentController.getAssignments);
router.get('/get_assignments_by_student/:id', assignmentController.getAssignmentsAssociatedWithStudent);

module.exports = router;

// id: submission_id,
// title: assignment name
// description: assignment_desc
// label: course_name

// lanes: [
//     {
//       id: status,
//       title: status,
//       label: '2/2',
//       cards: [
//         {id: submission_id, title: assignment name, description: assignment description, label: course name, draggable: false},
//         {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
//       ]
//     }