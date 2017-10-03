// app/models/academia.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrenamientoSchema   = new Schema({
    
    _id: String,
    nombre: String,
    profesor: String,
    alumnos : [{ type: Schema.Types.ObjectId, ref: 'Alumno' }]
});

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema);