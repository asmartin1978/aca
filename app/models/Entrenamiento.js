// app/models/academia.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EntrenamientoSchema   = new Schema({
    
    _id: String,
    nombre: String,
    profesor: String,
    alumnos : [   	
		{    		
    		alum: {type: Schema.Types.ObjectId, ref: 'Alumno'},
    		asiste: {type: Boolean, default: false}		 
    	}
    ]
});

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema);