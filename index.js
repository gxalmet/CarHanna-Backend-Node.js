'use strict'
var mongoose = require('mongoose');
var app = require('./app');

const globalApp = require('./global/global-app');

// Local Connection to database
var port_api = '3700';
const port_db = '27017';
const server = 'localhost';
const database = 'CarHanna';

// mongoose.Promise = global.Promise;

// mongoose.connect(`mongodb://${server}:${port_db}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//     .then(() => {
//         console.log('Conexió establerta amb el servidor local...');
//         //creació del servidor
//         app.listen(port_api, () => {
//             console.log('Servidor a la ruta url  http://' + server + ":" + port_db)
//         })
//     })

// .catch(err => {
//     console.log(err);
// });

// Cloud connection to database

const uri = globalApp.uri;
mongoose.Promise = global.Promise;
console.log(uri);

const PORT = process.env.PORT || port_api;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('Conexió establerta amb mongoDB cloud storage');
        //creació del servidor
        //app.listen(port_api, () => {
        app.listen(PORT, () => {

            console.log(`Our app is running on port ${ PORT }`)
        })
    })

.catch(err => {
    console.log('Error al conectar-se a MongoDB Atlas');
    console.log(process);
    console.log(err);
});