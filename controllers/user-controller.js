'use strict'

var User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const helper = require('./helper');
const { hash } = require('bcryptjs');

const messages = require('./messages');

var mes = messages.get();

var userController = {

    createUser: function(req, res) {
        var user = new User();
        var params = req.body;


        user.email = params.email;
        user.person.firstname = params.person.firstname;
        user.person.lastname = params.person.lastname;
        user.password = params.password;

        var promise = User.find({ email: user.email }).exec();

        promise.
        then(userfind => {
            if (userfind.length == 0) {
                user.save((err, usercreated) => {
                    if (err) { return res.status(500).send({ message: mes.user.create['001'] }) }
                    if (!usercreated) { return res.status(404).send({ message: mes.user.create['002'] }) }
                    //usercreated.password = helper.encryptPassword(usercreated.password);
                    return res.status(200).send({ user: usercreated, message: mes.user.create['003'] });
                })
            } else {
                return res.status(200).send({ message: mes.user.create['005'] })
            }
        }).
        catch(error => {
            return res.status(500).send({ message: mes.user.create['004'] + error })

        })
    },
    confirmLogin: function(req, res) {

        //LOGIN    
        var params = req.body;


        var user_email = params.email;
        var password = params.password;


        var promise = User.find({ email: user_email }).exec();

        promise.
        then(userfind => {
            if (userfind.length != 1) {
                return res.status(500).send({ message: mes.user.confirmLogin['001'] })
            } else {

                var token = jwt.sign({ user: userfind[0] }, 'carhana-app-super-shared-secret', { expiresIn: '1h' });
                var userOK = userfind[0];
                var promisePass = helper.matchPassword(userOK.password, password);

                promisePass.then(resP => {


                    if (resP == true || userOK.password == password) {

                        var promiseHash = helper.encryptPassword(userOK.password);
                        promiseHash.then(resH => {

                            userOK.password = resH;

                            return res.status(200).send({ userOK, token });
                        });
                    } else {

                        return res.status(500).send({ message: mes.user.confirmLogin['002'] })
                    }
                });

            }
        }).
        catch(error => {

            return res.status(500).send({ message: error + mes.user.confirmLogin['003'] })

        })
    },
    // getUser: function(req, res) {

    //     return res.status(200).send({ message: mes.user.confirmLogin['004'] });
    // },
    getUserByToken: function(req, res) {

        if (req.headers && req.headers.authorization) {
            var token = req.headers.authorization.split(' ')[1];

            var payload = null;

            payload = jwt.decode(token);
            if (!payload) {
                return res.status(200).send({
                    message: mes.getUserByToken.confirmLogin['001']
                });
            }
        }

        var userByToken = payload.user._id;

        if (!userByToken) {
            return res.status(500).send({ message: mes.getUserByToken.confirmLogin['002'] });
        }

        User.findById(userByToken, (errT, userReadT) => {

            if (errT) {
                return res.status(500).send({ message: mes.getUserByToken.confirmLogin['003'] })
            }
            if (!userReadT) {
                return res.status(404).send({ message: mes.getUserByToken.confirmLogin['004'] })
            }
            return res.status(200).send({ user: userReadT });
        })
    }
}

module.exports = userController;