var users = [
  {
    id: 2,
    name: 'test',
    password: 'test',
    first_name:'Prueba', 
    last_name:'Apellido' , 
    email:'mail@mail.com'
  },
  {
    id: 3,
    name: 'sutemi',
    password: 'Sutem1',
    first_name:'Sutemi', 
    last_name:'Fight Academy' , 
    email:'mail@mail.com'
  },
  {
    id: 4,
    name: 'aurelio',
    password: 'aurelio',
    first_name:'Aurelio',
    last_name:'Castilla', 
    email:'mail@mail.com'
  }
];


//Configuracion de la estrategia --------------------------------------

var passportJWT = require("passport-jwt");
var _ = require("lodash");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwt = require('jsonwebtoken');


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

function getToken(payload){
  return jwt.sign(payload, jwtOptions.secretOrKey);
}

// FIN Configuracion de la estrategia --------------------------------------


function autenticar(name, password, res){
  // usually this would be a database call:
  var user = users[_.findIndex(users, {name: name})];
  if( ! user ){
    return res.status(401).json({message:"no such user found"});
  }

  if(user.password === password) {
    
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id , first_name: user.first_name, last_name: user.last_name };
    var token = getToken(payload);
    return res.json({message: "ok", token: token});
  } else {
    return res.status(401).json({message:"Password incorrecta"});
  }

}

exports.strategy = strategy;
exports.autenticar = autenticar;