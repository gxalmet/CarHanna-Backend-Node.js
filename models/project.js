'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var projectSchema = schema({
    _id: Object,
    parentId: String,
    name: String,
    description: String,
    user_id: String,
    level: Number,
    check_date: {
        begin_date: Date,
        end_date: Date
    },
    status: String,
    team: [{
        team_user_id: String

    }]

});

module.exports = mongoose.model('collection-project', projectSchema);