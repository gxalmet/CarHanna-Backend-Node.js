'use strict'

var mongoose = require('mongoose');
var Project = require('./project');
var schema = mongoose.Schema;

var projectSchema = schema({
    project: {
        _id: Object,
        parentId: String,
        name: String,
        description: String,
        user_id: String,
        check_date: {
            begin_date: Date,
            end_date: Date
        },
        status: String
    },
    children: [{
        _id: Object,
        parentId: String,
        name: String,
        description: String,
        user_id: String,
        check_date: {
            begin_date: Date,
            end_date: Date
        },
        status: String
    }]
});

module.exports = mongoose.model('projectsTree', projectSchema);