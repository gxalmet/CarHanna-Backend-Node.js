'use strict'

//var Project = require('../models/project');

var ObjectId = require('mongodb').ObjectID;
const Team = require('../models/team');
const User = require('../models/user');
const Collegue = require('../models/collegue');
var token = require('./token');
const message = require('./messages');

var mes = message.get();


var teamsController = {

    createTeam: function(req, res) {

        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.teams.createTeam['001']
            });
        }

        var team = new Team();
        var params = req.body;


        team._id = new ObjectId();
        team.user_id = userByToken;


        User.findById(userByToken, (errT, userReadT) => {

            if (errT) {
                return res.status(500).send({ message: mes.teams.createTeam['002'] })
            }
            if (!userReadT) {
                return res.status(404).send({ message: mes.teams.createTeam['003'] })
            }
            //return res.status(200).send({ user: userReadT });

            team.collegues = [{
                'email': userReadT.email,
                'person': {
                    'firstname': userReadT.person.firstname,
                    'lastname': userReadT.person.lastname
                },
                'user_id_col': userReadT._id
            }];

            team.save((err, teamcreated) => {
                if (err) { return res.status(500).send({ message: mes.teams.createTeam['004'] + err }) }
                if (!teamcreated) { return res.status(404).send({ message: mes.teams.createTeam['005'] }) }
                return res.status(200).send({ teamcreated: teamcreated });
            })
        })




    },
    getTeam: function(req, res) {

        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.teams.getTeam['001']
            });
        }

        var teamId = req.params.id;

        Team.findById(ObjectId(teamId), (err, TeamRead) => {

            if (err) { return res.status(500).send({ message: mes.teams.getTeam['002'] }) }
            if (!TeamRead) {
                return res.status(404).send({ message: mes.teams.getTeam['003'] })
            }
            return res.status(200).send({ team: TeamRead });
        })
    },
    getTeamByUser: function(req, res) {

        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.teams.getTeamByUser['001']
            });
        }

        var query = {
            user_id: userByToken,
        }


        Team.find(query).exec((err, TeamRead) => {

            if (err) { return res.status(500).send({ message: mes.teams.getTeamByUser['002'] }) }
            if (!TeamRead || TeamRead.length == 0) {
                return res.status(404).send({ message: mes.teams.getTeamByUser['003'] })
            }

            return res.status(200).send({ team: TeamRead });
        })
    },
    updateTeam: async function(req, res) {
        var userByToken = token.getPayload(req);
        if (!userByToken) {
            return res.status(200).send({
                message: mes.teams.updateTeam['001']
            });
        }

        var teamId = req.params.id;

        var update = req.body;

        var queryUpdate = {
            // _id: ObjectId(teamId),
            user_id: userByToken,
            collegues: []
        };

        update.forEach(ups => {

            var querySearchUser = { email: ups.email.trim() };

            User.find(querySearchUser, (errUser, userFind) => {
                var item = new Collegue;

                if (errUser) { return res.status(500).send({ message: mes.teams.updateTeam['002'] + errU }) }
                if (!userFind[0]) {
                    item['email'] = ups.email;
                    item.person.firstname = ups.person.firstname;
                    item.person.lastname = ups.person.lastname;
                    //item['user_id_col'] = ups.user_id_col;
                    if (ups._id) {
                        item['_id'] = ObjectId(ups._id)
                    } else {
                        item['_id'] = new ObjectId();;
                    }


                } else {
                    item['email'] = ups.email;
                    item.person.firstname = userFind[0].person.firstname;
                    item.person.lastname = userFind[0].person.lastname
                    item['user_id_col'] = userFind[0]._id
                    if (ups._id) {
                        item['_id'] = ObjectId(ups._id);
                    } else {
                        item['_id'] = new ObjectId();
                    }

                }

                queryUpdate.collegues.push(item);

            });

        });

        Team.findById(ObjectId(teamId), (errFind, teamFind) => {

            if (errFind) { return res.status(500).send({ message: mes.teams.updateTeam['003'] + errFind }) }
            if (!teamFind) { return res.status(404).send({ message: mes.teams.updateTeam['004'] }) }
            teamFind.collegues = queryUpdate.collegues;

            teamFind.save((err, teamsaved) => {
                if (err) { return res.status(500).send({ message: mes.teams.updateTeam['005'] + err }) }
                if (!teamsaved) { return res.status(404).send({ message: mes.teams.updateTeam['006'] }) }
                return res.status(200).send({ teamsaved: teamsaved });
            })
        });

    },
}

module.exports = teamsController;