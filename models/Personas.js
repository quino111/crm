const mongoose = require('mongoose');
//definir el esquema
const resSchema = new mongoose.Schema({
    // nombre: { type: String, require: true}
    nombres: String,
    primer_apellido: String,
    segundo_apellido: String,
    ci: String,
    direccion: String,
    celular: Number,
    edad: Number
});

const Modelres = mongoose.model('Persona',resSchema, 'contactos');
module.exports = Modelres;