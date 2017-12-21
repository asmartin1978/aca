// app/models/academia.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrenamientoSchema   = new Schema({
    
    _uniid: Schema.Types.ObjectId,
    _id: String,
    nombre: String,
    fecha: Date, 
    profesor: String,
    inicio: String,
    fin: String,
    alumnos : [   	
		{    		
    		alum: {type: Schema.Types.ObjectId, ref: 'Alumno'},
    		asiste: {type: Boolean, default: false}		 
    	}
    ]
});

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema);