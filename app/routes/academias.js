var express = require('express');
var router = express.Router();

var Academia     = require('../models/academia'); // Importacion de la clase
var Entrenamiento     = require('../models/Entrenamiento'); // Importacion de la clase
var Alumno     = require('../models/alumno'); // Importacion de la clase   

//Entutamiento de bears, para la colecion entera
router.route('/academias')

    .post(function(req, res) {

        var academia = new Academia();      
        academia.nombre = req.body.nombre;
        academia.direccion = req.body.direccion;  
        academia.historia = req.body.historia;  
        academia.propietario = req.user.id;  

        // save the bear and check for errors
        academia.save(function(err) {
            if (err)
                res.send(err);

            res.json(academia);
        });

    })

    .get(/*passport.authenticate('jwt', { session: false }),*/ function(req, res) {
        
        Academia.find({propietario: req.user.id}, function(err, academias) {
            if (err)
                res.send(err);

            res.json(academias);
        })
    });


//Acceso a un item de la coleccion
router.route('/academias/:academia_id')

    .get(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
        Academia.findById(req.params.academia_id, function(err, academia) {
            if (err)
                res.send(err);
            res.json(academia);
        }).populate('alumnos');
    })

    .put(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {

        Academia.findById(req.params.academia_id, function(err, academia) {

            if (err)
                res.send(err);

            academia.nombre = req.body.nombre;
            academia.direccion = req.body.direccion;  
            academia.historia = req.body.historia;
            academia.propietario = req.body.propietario;

            // save the bear
            academia.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Academia updated!' });
            });

        });
    })

    .delete(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
        Academia.remove({
            _id: req.params.academia_id
        }, function(err, academia) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;    