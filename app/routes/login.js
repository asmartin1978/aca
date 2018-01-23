var express = require('express');
var router = express.Router();
var User = require("../models/user");
var auth     = require('../../auth');
var jwt = require('jsonwebtoken');
var Academia = require("../models/academia");

//Ruta de logado
/*router.route('/login')

    .post(function(req, res) {
          //Pillamos parametros del request
          //console.log("dddd");
          if(req.body.name && req.body.password){
            var name = req.body.name;
            var password = req.body.password;
          }
          return auth.autenticar(name, password, res);

    });*/


router.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.name,
      password: req.body.password,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    });
    // save the user
    newUser.save(function(err) {
      
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      
        User.findOne({
            username: req.body.name
          }, function(err, user) {
            if (err) throw err;

            if (!user) {
              res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
              // check if password matches
              user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                  // if user is found and password is right create a token
                  
                  var payload = {id: user.id , first_name: user.first_name, last_name: user.last_name };
                  var token = jwt.sign(payload, 'tasmanianDevil');
                  // return the information including token as JSON
                  res.json({success: true, token: 'JWT ' + token});
                } else {
                  res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
              });
            }
          });



    });
  }
});


router.post('/signin', function(req, res) {
  	
  User.findOne({
    username: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Autenticacion correcta.
          //Consultamos si tiene ya creada la academia correspondiente y generamos el token
          
           var payload = {id: user.id , first_name: user.first_name, last_name: user.last_name};
            //console.log(payload);
           var token = jwt.sign(payload, 'tasmanianDevil');
                // return the information including token as JSON
           res.json({success: true, token: 'JWT ' + token});

        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});




module.exports = router;