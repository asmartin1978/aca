// app/models/academia.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var InstructorSchema   = new Schema({
    
    nombre: String,
    apellidos: String,    
    propietario: String,
    academia: { type: String, ref: 'Academia' },
});

module.exports = mongoose.model('Instructor', InstructorSchema);