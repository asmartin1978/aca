// app/models/alumno.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
     
    _dia: String,
    title: String,
    start: String,
    description: String,
    end: String,
    editable: Boolean,
    academia: { type: String, ref: 'Academia' },
    //dow: [Number],
    propietario: String,
    color: String
});

module.exports = mongoose.model('Evento', EventSchema);