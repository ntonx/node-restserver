require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
//paquete para json
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Configuración global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err, res) => {
        if (err) throw err;
        console.log('base de datos ONLINE');
    }

);

app.listen(process.env.PORT, () => { console.log("EScuchando en puerto 3000"); });