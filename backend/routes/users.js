const express = require('express');

const userController = require('../controllers/users');

const router = express.Router();


router.post('/login', userController.login);

router.post('/signup', userController.signup);


module.exports = router;
