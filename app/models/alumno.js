// app/models/alumno.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlumnoSchema   = new Schema({
     
    nombre: String,
    apellidos: String,
    cinturon: String,
    descripcion: String,
    academia: { type: String, ref: 'Academia' },
    graduaciones:{
    	blanco : {
    		desde: Date,
    		hasta: Date
    	},
    	azul : {
    		desde: Date,
    		hasta: Date
    	}, 
    	morado : {
    		desde: Date,
    		hasta: Date
    	}, 
    	marron : {
    		desde: Date,
    		hasta: Date
    	},
    	negro : {
    		desde: Date,
    		hasta: Date
    	}

    }
});

module.exports = mongoose.model('Alumno', AlumnoSchema);