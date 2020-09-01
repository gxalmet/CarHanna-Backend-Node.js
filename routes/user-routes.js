'use strict'

var express = require('express');

var userController = require('../controllers/user-controller');

var router = express.Router();


router.post('/createuser', userController.createUser);
router.post('/confirmlogin', userController.confirmLogin);
//router.get('/getuserbyid:id', userController.getUser);
router.get('/getuserbytoken', userController.getUserByToken);

module.exports = router;