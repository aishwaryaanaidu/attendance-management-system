const router = require('express-promise-router')();
const submissionsController = require('../controllers/submissions.controller');

router.put('/update/status/:id', submissionsController.updateStatus);

module.exports = router;