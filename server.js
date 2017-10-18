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


//Rutas publicas para tener acceso a recursos de presentacion en la aplicacion cliente
app.use(express.static(__dirname + '/public'));
app.use('/calendar', express.static(__dirname + '/node_modules/fullcalendar/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/min/'));
app.use('/angular-momentjs', express.static(__dirname + '/node_modules/angular-momentjs/'));


//Seleccion del puerto
var port = process.env.PORT || 8080;        // set our port


// ENRUTAMIENTO
// =============================================================================
var router = express.Router();              // Instancio el router de express

// middleware
router.use(passport.authenticate('jwt', { session: false }),function(req, res, next) {
    // do logging
    console.log('Peticion recibida');
    next(); // Hay que llamar al siguiente middleware
});


// Ruta de test (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


//Importacion de las rutas de la aplicacion
var loginroute = require('./app/routes/login');
var alumnosroute = require('./app/routes/alumnos');
var academiaroute = require('./app/routes/academias');
var entrenamientoroute = require('./app/routes/entrenamientos');
var eventoroute = require('./app/routes/eventos');

// REGISTER OUR ROUTES -------------------------------


// all of our routes will be prefixed with /api
//TODO: La ruta de eventos esta desprotegida para escritura ...
app.use('/api' , eventoroute);
app.use('/api', router);
app.use('/api', alumnosroute);
app.use('/api', academiaroute);
app.use('/api', entrenamientoroute);
app.use('/autenticacion' , loginroute);



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Servicio arrancado en el puerto ' + port);