// app/models/academia.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AcademiaSchema   = new Schema({
    
    nombre: String,
    direccion: String,
    historia: String,
    alumnos : [{ type: Schema.Types.ObjectId, ref: 'Alumno' }]
});

module.exports = mongoose.model('Academia', AcademiaSchema);