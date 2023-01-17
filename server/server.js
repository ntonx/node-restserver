require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
//paquete para json
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.urlDB, {

//mongoose.connect("mongodb://mongosservice:27017/cafe",{
    useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err, res) => {
        if (err) throw err;
        console.log('base de datos ONLINE');
    }

);

app.listen(process.env.PORT, () => { console.log("Escuchando en puerto "+process.env.PORT ); });