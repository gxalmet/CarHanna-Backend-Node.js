'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var collegueSchema = schema({

    email: String,
    person: {
        firstname: String,
        lastname: String
    },
    user_id_col: String,


});

module.exports = mongoose.model('collegue', collegueSchema);