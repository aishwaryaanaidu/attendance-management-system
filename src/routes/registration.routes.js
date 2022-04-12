const router = require('express-promise-router')();
const registrationController = require('../controllers/registration.controller');

router.post('/registration', registrationController.createUser);
router.post('/login', registrationController.login);

module.exports = router;