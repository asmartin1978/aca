var express = require('express');
var router = express.Router();

var Instructor     = require('../models/instructor'); // Importacion de la clase
var Academia     = require('../models/academia'); 



//Acceso a un item de la coleccion
router.route('/instructores/:academia_id/:instructor_id')

    .get(function(req, res) {
        Instructor.findOne({_id: req.params.instructor_id , propietario: req.user.id , academia: req.params.academia_id }, function(err, instructor) {
            if (err)
                res.send(err);
            res.json(instructor);
        });
    })

    .put(function(req, res) {

        Instructor.findOne({_id: req.params.instructor_id , propietario: req.user.id , academia: req.params.academia_id  }, function(err, instructor) {

            if (err)
                res.send(err);

            instructor.nombre = req.body.nombre;
            instructor.apellidos = req.body.apellidos;  
            instructor.propietario = req.body.propietario;

            // save the bear
            instructor.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Instructor updated!' });
            });

        });
    });


//Acceso a un item de la coleccion
router.route('/instructores/:academia_id')

    .get(function(req, res) {

        Instructor.find({academia: req.params.academia_id , propietario: req.user.id }, function(err, instructor) {
            if (err)
                res.send(err);
            res.json(instructor);
        });
    })

    .post(function(req, res) {

        var instructor = new Instructor();      
        instructor.nombre = req.body.nombre;
        instructor.apellidos = req.body.apellidos;
        instructor.academia = req.params.academia_id;  
        instructor.propietario = req.user.id;  

         Academia.findById(instructor.academia, function (err, _acad){

            if (err){
                    res.send(err);
            }
            if(_acad.propietario != req.user.id){
                    res.send({ message: 'Error. No tiene permisos sobre esa academia' })
            }

            instructor.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json(instructor);
             });  


         });

    })

module.exports = router;    