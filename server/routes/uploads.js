const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
//modelos
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
//librerias
const fs = require('fs');
const path = require('path');

app.use(fileUpload());


app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ ok: false, err: { message: 'No se ha seleccionado ningun archivo' } });
    }

    // Valida tipo
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({ ok: false, err: { message: 'Los tipos permitidos son ' + tiposValidos.join(', ') } });
    }

    let archivo = req.files.archivo;
    //extensiones permitidas para la subida
    let nombreFragmentado = archivo.name.split('.');
    let extension = nombreFragmentado[nombreFragmentado.length - 1];

    let extensionesPermitidas = ['png', 'jpg', 'gif', 'jpeg']

    if (extensionesPermitidas.indexOf(extension) < 0) {
        return res.status(400).json({ ok: false, err: { message: 'Las extensiones permitidas son ' + extensionesPermitidas.join(', '), ext: extension } });
    }

    // Cambiar nombre al archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds()  }.${ extension }`;
    //Guardar archivo en sistema 
    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err)
            return res.status(500).json({ ok: false, err });

        // Aqui la imagen es cargada
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
    });
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({ ok: false, err });
        }
        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({ ok: false, err: { message: 'Usuaro no existe' } });
        }
        borraArchivo(usuarioDB.img, 'usuarios')
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({ ok: true, usuario: usuarioGuardado, img: nombreArchivo });
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(500).json({ ok: false, err });
        }
        if (!productoDB) {
            borraArchivo(nombreArchivo, 'productos');
            return res.status(400).json({ ok: false, err: { message: 'Producto no existe' } });
        }
        borraArchivo(productoDB.img, 'productos')
        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({ ok: true, producto: productoGuardado, img: nombreArchivo });
        });
    });
}

function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}


module.exports = app