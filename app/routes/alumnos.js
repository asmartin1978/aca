var express = require('express');
var router = express.Router();

var Academia     = require('../models/academia'); // Importacion de la clase
var Entrenamiento     = require('../models/Entrenamiento'); // Importacion de la clase
var Alumno     = require('../models/alumno'); // Importacion de la clase

//Entutamiento de bears, para la colecion entera
router.route('/alumnos')

    .post(function(req, res) {

        var alumno = new Alumno();      
        alumno.nombre = req.body.nombre;
        alumno.apellidos = req.body.apellidos;  
        alumno.cinturon = req.body.cinturon;  
        alumno.descripcion = req.body.descripcion;    
        alumno.academia = req.body.id_academia;
        
        
        if(req.body.graduaciones.blanco!=null){
            alumno.graduaciones.blanco.desde = req.body.graduaciones.blanco.desde;
            alumno.graduaciones.blanco.hasta = req.body.graduaciones.blanco.hasta;

            alumno.graduaciones.blanco.grado1 = req.body.graduaciones.blanco.grado1;
            alumno.graduaciones.blanco.grado2 = req.body.graduaciones.blanco.grado2;
            alumno.graduaciones.blanco.grado3 = req.body.graduaciones.blanco.grado3;
            alumno.graduaciones.blanco.grado4 = req.body.graduaciones.blanco.grado4;

        }
        if(req.body.graduaciones.azul!=null){
            alumno.graduaciones.azul.desde = req.body.graduaciones.azul.desde;
            alumno.graduaciones.azul.hasta = req.body.graduaciones.azul.hasta;

            alumno.graduaciones.azul.grado1 = req.body.graduaciones.azul.grado1;
            alumno.graduaciones.azul.grado2 = req.body.graduaciones.azul.grado2;
            alumno.graduaciones.azul.grado3 = req.body.graduaciones.azul.grado3;
            alumno.graduaciones.azul.grado4 = req.body.graduaciones.azul.grado4;
        }
        if(req.body.graduaciones.morado!=null){
            alumno.graduaciones.morado.desde = req.body.graduaciones.morado.desde;
            alumno.graduaciones.morado.hasta = req.body.graduaciones.morado.hasta;

            alumno.graduaciones.morado.grado1 = req.body.graduaciones.morado.grado1;
            alumno.graduaciones.morado.grado2 = req.body.graduaciones.morado.grado2;
            alumno.graduaciones.morado.grado3 = req.body.graduaciones.morado.grado3;
            alumno.graduaciones.morado.grado4 = req.body.graduaciones.morado.grado4;
        }
        if(req.body.graduaciones.marron!=null){
            alumno.graduaciones.marron.desde = req.body.graduaciones.marron.desde;
            alumno.graduaciones.marron.hasta = req.body.graduaciones.marron.hasta;

            alumno.graduaciones.marron.grado1 = req.body.graduaciones.marron.grado1;
            alumno.graduaciones.marron.grado2 = req.body.graduaciones.marron.grado2;
            alumno.graduaciones.marron.grado3 = req.body.graduaciones.marron.grado3;
            alumno.graduaciones.marron.grado4 = req.body.graduaciones.marron.grado4;
        }
        if(req.body.graduaciones.negro!=null){
            alumno.graduaciones.negro.desde = req.body.graduaciones.negro.desde;

            alumno.graduaciones.negro.grado1 = req.body.graduaciones.negro.grado1;
            alumno.graduaciones.negro.grado2 = req.body.graduaciones.negro.grado2;
            alumno.graduaciones.negro.grado3 = req.body.graduaciones.negro.grado3;
            alumno.graduaciones.negro.grado4 = req.body.graduaciones.negro.grado4;

        }

        //console.log(req.body.id_academia);
        //console.log(JSON.stringify(req.body));
        
        //Se comprueba que el usuario conectado es propietario de la academia donde se esta insertando
        Academia.findById(alumno.academia, function (err, _acad){
            if (err){
                    res.send(err);
            }
            if(_acad.propietario != req.user.id){
                    res.send({ message: 'Error. No tiene permisos sobre esa academia' })
            }

            alumno.save(function(err) {
                 
                //console.log("usuario conectado: "+ req.user.id + ". Propietario academia: " + _acad.propietario);
                /*Academia.findById(req.body.id_academia, function(err, aca) {*/
                    if (err){
                        res.send(err);
                    }                  
                    _acad.alumnos.push(alumno);
                    _acad.save(function(err) {
                        if (err){
                            res.send(err);
                        }
                        res.send(alumno);
                    });
               /* });*/

            });

        });

    })

    .get(function(req, res) {
        
        Academia.find({propietario: req.user.id},{_id:1}, function(err, academias) {
            if (err){
                res.send(err);
            }
            //console.log(academias);
            Alumno.find( {'academia': {$in: academias.map(function(el) {
                                                            return el._id
                                                            })}
                                      }   , function(err, alumnos) {
                if (err){
                    console.log(err);
                    res.status(500).json({ message: 'Error al acceder al detalle' });
                }
                    res.json(alumnos);
                }).populate('academia', 'nombre direccion historia');

        })

        
    });


//Acceso a un item de la coleccion
router.route('/alumnos/:alumno_id')

    .get(function(req, res) {
        Alumno.findById(req.params.alumno_id, function(err, alumno) {
            if (err){
                console.log(err);
                res.status(500).json({ message: 'Error al acceder al detalle' });
            }
            res.json(alumno);
        }).populate('academia', 'nombre direccion historia');
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Alumno.findById(req.params.alumno_id, function(err, alumno) {

            if (err)
                res.send(err);
            //console.log(alumno);
            alumno.nombre = req.body.nombre;
            alumno.apellidos = req.body.apellidos;  
            alumno.cinturon = req.body.cinturon;  
            alumno.descripcion = req.body.descripcion;  // update the bears info


            if(req.body.graduaciones.blanco!=null){
                alumno.graduaciones.blanco.desde = req.body.graduaciones.blanco.desde;
                alumno.graduaciones.blanco.hasta = req.body.graduaciones.blanco.hasta;

                alumno.graduaciones.blanco.grado1 = req.body.graduaciones.blanco.grado1;
                alumno.graduaciones.blanco.grado2 = req.body.graduaciones.blanco.grado2;
                alumno.graduaciones.blanco.grado3 = req.body.graduaciones.blanco.grado3;
                alumno.graduaciones.blanco.grado4 = req.body.graduaciones.blanco.grado4;

            }
            if(req.body.graduaciones.azul!=null){
                alumno.graduaciones.azul.desde = req.body.graduaciones.azul.desde;
                alumno.graduaciones.azul.hasta = req.body.graduaciones.azul.hasta;

                alumno.graduaciones.azul.grado1 = req.body.graduaciones.azul.grado1;
                alumno.graduaciones.azul.grado2 = req.body.graduaciones.azul.grado2;
                alumno.graduaciones.azul.grado3 = req.body.graduaciones.azul.grado3;
                alumno.graduaciones.azul.grado4 = req.body.graduaciones.azul.grado4;
            }
            if(req.body.graduaciones.morado!=null){
                alumno.graduaciones.morado.desde = req.body.graduaciones.morado.desde;
                alumno.graduaciones.morado.hasta = req.body.graduaciones.morado.hasta;

                alumno.graduaciones.morado.grado1 = req.body.graduaciones.morado.grado1;
                alumno.graduaciones.morado.grado2 = req.body.graduaciones.morado.grado2;
                alumno.graduaciones.morado.grado3 = req.body.graduaciones.morado.grado3;
                alumno.graduaciones.morado.grado4 = req.body.graduaciones.morado.grado4;
            }
            if(req.body.graduaciones.marron!=null){
                alumno.graduaciones.marron.desde = req.body.graduaciones.marron.desde;
                alumno.graduaciones.marron.hasta = req.body.graduaciones.marron.hasta;

                alumno.graduaciones.marron.grado1 = req.body.graduaciones.marron.grado1;
                alumno.graduaciones.marron.grado2 = req.body.graduaciones.marron.grado2;
                alumno.graduaciones.marron.grado3 = req.body.graduaciones.marron.grado3;
                alumno.graduaciones.marron.grado4 = req.body.graduaciones.marron.grado4;
            }
            if(req.body.graduaciones.negro!=null){
                alumno.graduaciones.negro.desde = req.body.graduaciones.negro.desde;

                alumno.graduaciones.negro.grado1 = req.body.graduaciones.negro.grado1;
                alumno.graduaciones.negro.grado2 = req.body.graduaciones.negro.grado2;
                alumno.graduaciones.negro.grado3 = req.body.graduaciones.negro.grado3;
                alumno.graduaciones.negro.grado4 = req.body.graduaciones.negro.grado4;

            }





            // save the bear
            alumno.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Alumno updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Alumno.remove({
            _id: req.params.alumno_id
        }, function(err, alumno) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;