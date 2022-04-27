const router = require('express-promise-router')();
const submissionsController = require('../controllers/submissions.controller');

router.put('/update/status/:id', submissionsController.updateStatus);
router.put('/update/submit_file/:id', submissionsController.submitFile);

module.exports = router;