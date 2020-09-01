'use strict'
var mongoose = require('mongoose');
var schema = mongoose.Schema;


var userSchema = schema({
    email: String,
    person: {
        firstname: String,
        lastname: String
    },
    password: String
});


module.exports = mongoose.model('User', userSchema);