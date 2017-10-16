// app/models/alumno.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
     
    id: String,
    title: String,
    start: String,
    description: String,
    end: String,
    editable: Boolean,
    academia: { type: String, ref: 'Academia' },
    dow: [Number]
});

module.exports = mongoose.model('Evento', EventSchema);