var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MaestroEventoSchema   = new Schema({
     
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

module.exports = mongoose.model('maestroevento', MaestroEventoSchema);