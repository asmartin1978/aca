var express = require('express');
var router = express.Router();

var Academia     = require('../models/academia'); // Importacion de la clase
var Evento     = require('../models/event'); // Importacion de la clase
var MaestroEvento     = require('../models/maestroevento'); // Importacion de la clase

router.route('/eventos')

    .post(function(req, res) {

        var evento = new Evento();      
        
        evento.id = req.body.id;
        evento.start = req.body.start;
        evento.description = req.body.description;
        evento.end = req.body.end;
        evento.editable = req.body.editable;
        evento.dow = req.body.dow;
        evento.title = req.body.title;
        evento.academia = req.body.id_academia;
        evento.propietario = req.user.id;        
        //console.log(JSON.stringify(req.body));
        evento.save(function(err) {                                         
                    if (err){
                        res.send(err);
                    }
            });
        

    });


//Devuelve los eventos instalados en un dia determinado
router.route('/eventosinstalados/:academia_id/:dia')    

    .get(function(req, res) {
        Evento.find({academia:req.params.academia_id , propietario: req.user.id , _dia:req.params.dia}, function(error, eventos){
            

            if(error){
                res.status(500).json({message: 'error al acceder a los eventos'});
            }
            res.json(eventos);
        })
        
    });

//Devuelve los eventos instalados en un dia determinado
router.route('/instalarsesiones/:academia_id/:dia')    

    .get(function(req, res) {

        
        MaestroEvento.find({academia:req.params.academia_id , propietario: req.user.id},function(error, maestro){            
            if(error){
                res.status(500).json({message: 'error al acceder al maestro eventos'});
            }

            maestro.forEach(function(element){
                    var evento = new Evento();             
                    
                    evento._dia = req.params.dia;
                    evento.start = req.params.dia+" " + element.start;
                    evento.description = element.description;
                    evento.end = req.params.dia+" " + element.end;;
                    evento.editable = false;
                    //evento.dow = req.body.dow;
                    evento.title = element.description;
                    evento.academia = element.academia;
                    evento.propietario = element.propietario;
                    evento.color = element.color;  
                    //console.log(JSON.stringify(req.body));
                    evento.save(function(err) {                                         
                                if (err){
                                    console.log("Error creando el evento");
                                }
                        });
            });
            res.status(200).json({message: 'Todo ok'});

        })
        
    });


router.route('/maestroeventos/:academia_id')    

    .get(function(req, res) {

        MaestroEvento.find({academia:req.params.academia_id , propietario: req.user.id}, function(error, eventos){
            if(error){
                res.status(500).json({message: 'error al acceder a los eventos'});
            }
            res.json(eventos);
        })
        
    });



router.route('/eventos/:academia_id')    

    .get(function(req, res) {

        Evento.find({academia:req.params.academia_id , propietario: req.user.id}, function(error, eventos){
            if(error){
                res.status(500).json({message: 'error al acceder a los eventos'});
            }
            res.json(eventos);
        })
        
    });


module.exports = router;