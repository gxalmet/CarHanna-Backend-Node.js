'use strict'

var mongoose = require('mongoose');
var collegue = require('./collegue');
var schema = mongoose.Schema;

var teamSchema = schema({
    _id: Object,
    user_id: String,
    collegues: [{

        email: String,
        person: {
            firstname: String,
            lastname: String
        },
        user_id_col: String,


    }]

});

module.exports = mongoose.model('collection-team', teamSchema);