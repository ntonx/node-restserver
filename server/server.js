require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
//paquete para json
const bodyParser = require('body-parser');
app.use(require('./routes/usuario'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    /* }*/

    , (err, res) => {
        if (err) throw err;
        console.log('base de datos ONLINE');
    }

);

app.listen(process.env.PORT, () => { console.log("EScuchando en puerto 3000"); });