'use strict'

var Project = require('../models/project');
// const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
// var Mongoose = require('mongoose');
// const { json } = require('body-parser');
const project = require('../models/project');
var token = require('./token');
//var transformProjectTree = require('./tree-transform');
const message = require('./messages');

var mes = message.get();

var projectsController = {
    createProject: function(req, res) {
        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.project.createProject['001']
            });
        }

        var project = new Project();
        var params = req.body;

        project._id = new ObjectId();
        project.parentId = params.parentId;
        project.name = params.name;
        project.description = params.description;
        project.user_id = userByToken;
        project.check_date.begin_date = params.check_date.begin_date;
        project.check_date.end_date = params.check_date.end_date;
        project.status = params.status;
        if (project.parentId) {

            Project.findById(ObjectId(project.parentId), (err, projectRead) => {
                if (err) { return res.status(500).send({ message: mes.project.getProject['002'] }) }
                if (!projectRead) {
                    return res.status(404).send({ message: mes.project.getProject['003'] })
                }
                project.level = projectRead.level + 1;
                if (new Date(project.check_date.begin_date) < new Date(projectRead.check_date.begin_date) ||
                    new Date(project.check_date.end_date) > new Date(projectRead.check_date.end_date)) {
                    return res.status(404).send({ message: "Chidreen project dates must be included into project parent dates." });
                }
                project.save((err, projectcreated) => {
                    if (err) { return res.status(500).send({ message: mes.project.createProject['002'] + err }) }
                    if (!projectcreated) { return res.status(404).send({ message: mes.project.createProject['003'] }) }
                    return res.status(200).send({ project: projectcreated });
                })

            })
        } else {
            project.level = 1;
            project.save((err, projectcreated) => {
                if (err) { return res.status(500).send({ message: mes.project.createProject['002'] + err }) }
                if (!projectcreated) { return res.status(404).send({ message: mes.project.createProject['003'] }) }
                return res.status(200).send({ project: projectcreated });
            })
        }



    },
    getProject: function(req, res) {

        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.project.getProject['001']
            });
        }

        var projectId = req.params.id;



        Project.findById(ObjectId(projectId), (err, projectRead) => {

            if (err) { return res.status(500).send({ message: mes.project.getProject['002'] }) }
            if (!projectRead) {
                return res.status(404).send({ message: mes.project.getProject['003'] })
            }

            return res.status(200).send({ project: projectRead });
        })
    },
    getProjects: function(req, res) {

        var querySearch = req.query;

        var userByToken = token.getPayload(req);



        if (!userByToken) {
            return res.status(200).send({
                message: mes.project.getProjects['001']
            });
        }
        var parameter = querySearch['projectParent'];
        var parentId = '';

        var obj = JSON.parse(parameter);

        if (obj) {
            parentId = obj._id;
        }

        if (parentId.length > 0) {
            var query = {
                user_id: userByToken,
                parentId: parentId
            }
        } else {
            var query = {
                user_id: userByToken,
            }
        }



        Project.find(query).exec((err, projects) => {

            if (err) { return res.status(500).send({ message: mes.project.getProjects['002'] }) }
            if (!projects) { return res.status(404).send({ message: mes.project.getProjects['003'] }) }

            var projectsSort = projects;



            var projectsReturn = [];
            if (parentId.length == 0) {
                projects.forEach(projectR => {
                    //if (!projectR.parentId) {
                    projectsReturn.push(projectR);
                    projectsSort.forEach(projectsSortR => {
                            var found = false;
                            if (projectR._id == projectsSortR.parentId) {
                                projectsReturn.forEach(proRetR => {
                                    if (proRetR._id == projectsSortR._id) {
                                        found = true;
                                    }
                                })
                                if (found) {
                                    projectsReturn.push(projectsSortR);
                                }

                            }
                        })
                        //}
                })

            } else {
                projectsReturn = projects;
            }
            projectsReturn.sort((a, b) => {
                // if ((!(a.parentId == b.parentId)) && a._id == b.parentId) {
                //     return -1;
                // }
                // if ((!(a.parentId == b.parentId)) && a.parentId == b._id) {
                //     return 1;
                // }
                if (a.parentId == b.parentId && (new Date(a.check_date.begin_date) < new Date(b.check_date.begin_date))) {
                    return -1;
                }
                if (a.parentId == b.parentId && (new Date(a.check_date.begin_date) >= new Date(b.check_date.begin_date))) {
                    return 1;
                }

                return 0;
            })
            return res.status(200).send({ projects: projectsReturn });
        })
    },
    updateProject: function(req, res) {
        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.project.updateProject['001']
            });
        }

        var projectId = req.params.id;

        var update = req.body;

        var queryUpdate = {
            check_date: {
                begin_date: update.check_date.begin_date,
                end_date: update.check_date.end_date
            },
            name: update.name,
            description: update.description,
            user_id: update.user_id,
            status: update.status,
            team: update.team
        };

        Project.findByIdAndUpdate(ObjectId(projectId), queryUpdate, { upsert: true, new: true }, (errU, projectUpdated) => {
            // Project.findOneAndUpdate(ObjectId(projectId), update, { new: true }, (errU, projectUpdated) => {

            if (errU) { return res.status(500).send({ message: mes.project.updateProject['002'] }) }
            if (!projectUpdated) { return res.status(404).send({ message: mes.project.updateProject['003'] }) }
            return res.status(200).send({ project: projectUpdated });
        })
    },
    deleteproject: function(req, res) {

        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.project.deleteproject['001']
            });
        }

        var projectId = req.params.id;

        Project.findByIdAndDelete(ObjectId(projectId), (errD, projectD) => {
            if (errD) { return res.status(500).send({ message: mes.project.deleteproject['002'] }) }
            if (!projectD) { return res.status(404).send({ message: mes.project.deleteproject['003'] }) }
            return res.status(200).send({ projectD });
        })
    },
    getProjectsTree: function(req, res) {

        var querySearch = req.query;

        var userByToken = token.getPayload(req);

        if (!userByToken) {
            return res.status(200).send({
                message: mes.project.getProjectsTree['001']
            });
        }
        var parameter = querySearch['projectParent'];
        var parentId = '';

        var obj = JSON.parse(parameter);

        if (obj) {
            parentId = obj._id;
        }

        if (parentId.length > 0) {
            var query = {
                user_id: userByToken,
                parentId: parentId
            }
        } else {
            var query = {
                user_id: userByToken,
            }
        }

        Project.find(query).exec((err, projects) => {

            if (err) { return res.status(500).send({ message: mes.project.getProjectsTree['002'] }) }
            if (!projects) { return res.status(404).send({ message: mes.project.getProjectsTree['003'] }) }

            var projectsReturn = [];

            //projectsReturn = transformProjectTree(projects);



            return res.status(200).send({ projects: projectsReturn });
        })
    }

}

module.exports = projectsController;