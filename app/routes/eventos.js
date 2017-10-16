var express = require('express');
var router = express.Router();

var Academia     = require('../models/academia'); // Importacion de la clase
var Evento     = require('../models/event'); // Importacion de la clase

//Entutamiento de bears, para la colecion entera
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

        //console.log(JSON.stringify(req.body));
        evento.save(function(err) {                                         
                    if (err){
                        res.send(err);
                    }
            });
        

    });


router.route('/eventos/:academia_id')    

    .get(function(req, res) {
        
        Evento.find({academia:req.params.academia_id}, function(error, eventos){
            if(error){
                res.status(500).json({message: 'error al acceder a los eventos'});
            }
            res.json(eventos);
        })
        
    });


module.exports = router;