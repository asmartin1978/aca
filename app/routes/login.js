var express = require('express');
var router = express.Router();

var auth     = require('../../auth');

//Ruta de logado
router.route('/login')

    .post(function(req, res) {
          //Pillamos parametros del request
          //console.log("dddd");
          if(req.body.name && req.body.password){
            var name = req.body.name;
            var password = req.body.password;
          }
          return auth.autenticar(name, password, res);

    });


module.exports = router;