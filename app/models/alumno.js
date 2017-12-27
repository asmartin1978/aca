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
    		hasta: Date,
            grado1: Date,
            grado2: Date,
            grado3: Date,
            grado4: Date
    	},
    	azul : {
    		desde: Date,
    		hasta: Date,
            grado1: Date,
            grado2: Date,
            grado3: Date,
            grado4: Date
    	}, 
    	morado : {
    		desde: Date,
    		hasta: Date,
            grado1: Date,
            grado2: Date,
            grado3: Date,
            grado4: Date
    	}, 
    	marron : {
    		desde: Date,
    		hasta: Date,
            grado1: Date,
            grado2: Date,
            grado3: Date,
            grado4: Date
    	},
    	negro : {
    		desde: Date,
    		hasta: Date,
            grado1: Date,
            grado2: Date,
            grado3: Date,
            grado4: Date
    	}

    },

});

module.exports = mongoose.model('Alumno', AlumnoSchema);