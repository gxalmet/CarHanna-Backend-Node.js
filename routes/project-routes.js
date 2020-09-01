'use strict'

var express = require('express');
var projectController = require('../controllers/project-controller');

var router = express.Router();


router.post('/createproject', projectController.createProject);
router.get('/getproject/:id', projectController.getProject);
router.get('/getprojects', projectController.getProjects);
router.get('/getprojectstree', projectController.getProjectsTree);
router.put('/updateproject/:id', projectController.updateProject);
router.delete('/deleteproject/:id', projectController.deleteproject);

module.exports = router;