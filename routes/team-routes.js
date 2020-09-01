'use strict'

var express = require('express');
var teamController = require('../controllers/teams-controller');
var router = express.Router();

router.post('/createteam', teamController.createTeam);
router.get('/getteam/:id', teamController.getTeam);
router.get('/getteambyuser', teamController.getTeamByUser);
router.put('/updateteam/:id', teamController.updateTeam);

module.exports = router;