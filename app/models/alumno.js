// app/models/alumno.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlumnoSchema   = new Schema({
     
    nombre: String,
    apellidos: String,
    cinturon: String,
    descripcion: String,
    academia: { type: String, ref: 'Academia' },

});

module.exports = mongoose.model('Alumno', AlumnoSchema);