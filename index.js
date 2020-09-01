'use strict'
var mongoose = require('mongoose');
var app = require('./app');

var port_api = '3700';
const port_db = '27017';
const server = 'localhost';
const database = 'CarHanna';

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${server}:${port_db}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log('Conexió establerta amb el servidor local...');
        //creació del servidor
        app.listen(port_api, () => {
            console.log('Servidor a la ruta url  http://' + server + ":" + port_db)
        })
    })

.catch(err => {
    console.log(err);
});