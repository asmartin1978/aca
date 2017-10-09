// server.js

// BASE SETUP
// =============================================================================

var express    = require('express');        // Importacion del framework express
var app        = express();                 // Instanciacion de la API usando express
var bodyParser = require('body-parser');    // Instanciaion de bodyParser para procesar el request.


app.use(bodyParser.urlencoded({ extended: true })); //Configuro body parser para leer JSON en el body
app.use(bodyParser.json());

var passport = require("passport");
//Importamos la estrategia
var auth     = require('./auth');
//Le decimos a passport que la use
passport.use(auth.strategy);
app.use(passport.initialize());



var mongoose   = require('mongoose');   //Importacion de mongoose
var Alumno     = require('./app/models/alumno'); // Importacion de la clase 
var Academia     = require('./app/models/academia'); // Importacion de la clase 
var Entrenamiento     = require('./app/models/Entrenamiento'); // Importacion de la clase 


var dbURI = 'mongodb://user:user@ds149954.mlab.com:49954/bears';  //Cadena de conexion a la BD Mongo

mongoose.connect(dbURI); // Conexion a la BD

//Callback para procesar el evento connected
mongoose.connection.on('connected', function () {  
  console.log('Conectado a la Base de Datos');
}); 

//Callback para procesar el evento error
mongoose.connection.on('error',function (err) { 
   console.log('Error de conexion de Mongoose: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Desconectado de la Base de Datos'); 
});


app.use(express.static(__dirname + '/public'));

app.use('/calendar', express.static(__dirname + '/node_modules/fullcalendar/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/min/'));



//Seleccion del puerto
var port = process.env.PORT || 8080;        // set our port


// ENRUTAMIENTO
// =============================================================================
var router = express.Router();              // Instancio el router de express

// middleware
router.use(function(req, res, next) {
    // do logging
    //console.log('Peticion recibida');
    next(); // Hay que llamar al siguiente middleware
});


// Ruta de test (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/login')

    .post(function(req, res) {
          //Pillamos parametros del request
          if(req.body.name && req.body.password){
            var name = req.body.name;
            var password = req.body.password;
          }
          return auth.autenticar(name, password, res);

    });

//Entutamiento de bears, para la colecion entera
router.route('/alumnos')

    .post(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {

        var alumno = new Alumno();      
        alumno.nombre = req.body.nombre;
        alumno.apellidos = req.body.apellidos;  
        alumno.cinturon = req.body.cinturon;  
        alumno.descripcion = req.body.descripcion;    
        alumno.academia = req.body.id_academia;
        //console.log(JSON.stringify(req.body));
        alumno.save(function(err) {
                               
                Academia.findById(req.body.id_academia, function(err, aca) {
                    if (err){
                        res.send(err);
                    }
                    //res.send(aca.nombre);
                    aca.alumnos.push(alumno);
                    aca.save(function(err) {
                        if (err){
                            res.send(err);
                        }

                        res.send(alumno);
                    });
                });

            });
        

    })

    .get(/*passport.authenticate('jwt', { session: false }),*/ function(req, res) {
        Alumno.find(function(err, alumnos) {
            if (err){
                console.log(err);
                res.status(500).json({ message: 'Error al acceder al detalle' });
            }

            res.json(alumnos);
        }).populate('academia', 'nombre direccion historia');
    });


//Acceso a un item de la coleccion
router.route('/alumnos/:alumno_id')

    .get(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
        Alumno.findById(req.params.alumno_id, function(err, alumno) {
            if (err){
                console.log(err);
                res.status(500).json({ message: 'Error al acceder al detalle' });
            }
            res.json(alumno);
        }).populate('academia', 'nombre direccion historia');
    })

    .put(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {

        // use our bear model to find the bear we want
        Alumno.findById(req.params.alumno_id, function(err, alumno) {

            if (err)
                res.send(err);

            alumno.nombre = req.body.nombre;
            alumno.apellidos = req.body.apellidos;  
            alumno.cinturon = req.body.cinturon;  
            alumno.descripcion = req.body.descripcion;  // update the bears info

            // save the bear
            alumno.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Alumno updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
        Alumno.remove({
            _id: req.params.alumno_id
        }, function(err, alumno) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });





//Entutamiento de bears, para la colecion entera
router.route('/academias')

    .post(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {

        var academia = new Academia();      
        academia.nombre = req.body.nombre;
        academia.direccion = req.body.direccion;  
        academia.historia = req.body.historia;  
        

        // save the bear and check for errors
        academia.save(function(err) {
            if (err)
                res.send(err);

            res.json(academia);
        });

    })

    .get(/*passport.authenticate('jwt', { session: false }),*/ function(req, res) {
        Academia.find(function(err, academias) {
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

        // use our bear model to find the bear we want
        Academia.findById(req.params.academia_id, function(err, academia) {

            if (err)
                res.send(err);

            academia.nombre = req.body.nombre;
            academia.direccion = req.body.direccion;  
            academia.historia = req.body.historia;

            // save the bear
            academia.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Academia updated!' });
            });

        });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
        Academia.remove({
            _id: req.params.academia_id
        }, function(err, academia) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



//Api de sesiones de entrenamiento
//Entutamiento de bears, para la colecion entera
router.route('/entrenamientos')

    .post(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {

        var entrenamiento = new Entrenamiento();      
        
        entrenamiento._id = req.body._id;
        entrenamiento.nombre = req.body.nombre;
        entrenamiento.profesor = req.body.profesor;  

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

    .get(/*passport.authenticate('jwt', { session: false }),*/ function(req, res) {
        Entrenamiento.find(function(err, entrenamientos) {
            if (err)
                res.send(err);

            res.json(entrenamientos);
        })
    });


//Acceso a un item de la coleccion
router.route('/entrenamientos/:entrenamiento_id')

    .get(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
        Entrenamiento.findById(req.params.entrenamiento_id, function(err, entrenamiento) {
            if (err)
                res.send(err);
            res.json(entrenamiento);
        }).populate('alumnos.alum');
    })

    .put(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
       
        // use our bear model to find the bear we want
        Entrenamiento.findById(req.params.entrenamiento_id, function(err, entrenamiento) {

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
    .delete(/*passport.authenticate('jwt', { session: false }),*/function(req, res) {
        Entrenamiento.remove({
            _id: req.params.entrenamiento_id
        }, function(err, entrenamiento_id) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });







// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Servicio arrancado en el puerto ' + port);