var express = require('express');
var router = express.Router();

var Academia     = require('../models/academia'); // Importacion de la clase
var Entrenamiento     = require('../models/Entrenamiento'); // Importacion de la clase
var Alumno     = require('../models/alumno'); // Importacion de la clase

var mongoose     = require('mongoose');

//Api de sesiones de entrenamiento
//Entutamiento de bears, para la colecion entera
router.route('/entrenamientos')

    .post(function(req, res) {

        var entrenamiento = new Entrenamiento();      
        
        entrenamiento._uniid = new mongoose.Types.ObjectId();
        entrenamiento._id = req.body._id;
        entrenamiento.nombre = req.body.nombre;
        entrenamiento.profesor = req.body.profesor;  
        
        entrenamiento.fecha = req.body.fecha;
        entrenamiento.inicio = req.body.inicio;
        entrenamiento.fin = req.body.fin;
        entrenamiento.propietario = req.user.id;    


        Alumno.find(function(err, alumnos) {
                if (err){
                    console.log('Error:' + err);
                }
                var arrayLength = alumnos.length;
                for (var i = 0; i < arrayLength; i++) {
                    entrenamiento.alumnos.push({alum:alumnos[i]._id , asiste:false});                    
                }

                entrenamiento.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json(entrenamiento);
                });
        });
   
        
    })

    .get(function(req, res) {
        //console.log(req.user.id);
        Entrenamiento.find({propietario: req.user.id}, function(err, entrenamientos) {
            if (err)
                res.send(err);

            //console.log(passport);
            res.json(entrenamientos);
        })
    });


//Acceso a un item de la coleccion
router.route('/entrenamientos/:entrenamiento_id')
    
    .get(function(req, res) {
        
        Entrenamiento.findOne({_id:req.params.entrenamiento_id,propietario:req.user.id}, function(err, entrenamiento) {
            if (err)
                res.send(err);
            res.json(entrenamiento);
        }).populate('alumnos.alum');
    })

    .put(function(req, res) {
       
        // use our bear model to find the bear we want
        Entrenamiento.findOne({_id:req.params.entrenamiento_id,propietario:req.user.id}, function(err, entrenamiento) {

            if (err){
                res.send(err);
            }
            
            //Se marca el alumno como asistente al entrenamiento
            //entrenamiento.alumnos.push(req.body.alumnoid);
                
            var arrayLength = entrenamiento.alumnos.length;
                for (var i = 0; i < arrayLength; i++) {

                    //console.log (entrenamiento.alumnos[i].alum + "-" + req.body.alumnoid);

                    if(entrenamiento.alumnos[i].alum == req.body.alumnoid){
                            entrenamiento.alumnos[i].asiste = !entrenamiento.alumnos[i].asiste;
                            break;
                    }
                    
            }

            entrenamiento.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Academia updated!' });
                
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Entrenamiento.remove({
            _id: req.params.entrenamiento_id , propietario:req.user.id
        }, function(err, entrenamiento_id) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



router.route('/entrenamientosporalumno/:alumno_id')
   
    .get(function(req, res) {
        
        Entrenamiento.

          find({"alumnos":{ $elemMatch: {alum: req.params.alumno_id , asiste:true} }}).
          exec(function(err, entrenamientos) {
            if (err)
                res.send(err);
            //console.log(passport);
            res.json(entrenamientos);
        });

    });

module.exports = router;  