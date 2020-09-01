'use strict'
//Cargar modulo express
var express = require('express');
//Cargar bodyparser
var bodyParser = require('body-parser');
//Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const expressJwt = require('express-jwt');
var cors = require('cors');



//guardar app
var app = express();

// load Routing files
var project_Routes = require('./routes/project-routes');
var user_Routes = require('./routes/user-routes');
var team_Routes = require('./routes/team-routes');


//Middleware metedo antes del controlador
// configuración necesaria para bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
// tot el que t arribi es converteix en un json
app.use(bodyParser.json());
app.use(cors());

//expressJwt
app.use(expressJwt({ secret: 'carhana-app-super-shared-secret', algorithms: ['HS256'] })
    .unless({ path: ['/api/user/confirmlogin', '/api/user/createuser'] }));

//CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers',
//         'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

// Passport




//load routes
app.use('/api/projects', project_Routes);
app.use('/api/user', user_Routes);
app.use('/api/team', team_Routes);
//Export
module.exports = app;