var myApp = angular.module('angularTodo',['angular-momentjs' , "chart.js"])
;


//this is used to parse the profile
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}



myApp.controller('academiasController', function ($window, $scope, $http ) {
  $scope.formData = {};
  
  // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/academias')
    .success(function(data) {
      $scope.academias = data;
    })
    .error(function(data,status) {
          console.log('Error: ' + data );
    });

    // Cuando se hace submit (alta de alumno)
  $scope.submitForm = function() {

      $http.post('/api/academias', $scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.academias.push(data);
          })
          .error(function(data) {
            console.log('Error:' + data);
          });
      
  };

});




myApp.controller('mainController', function ($window, $scope, $http ) {
  $scope.formData = {};
  
  // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/academias')
    .success(function(data) {
      $scope.academias = data;
      //console.log(data)
    })
    .error(function(data,status) {
          console.log('Error: ' + data );
    });


    $scope.loadSesionesAcademia=function(id){        
        
        //console.log(id);
        $http.get('/api/academias/'+id)
          .success(function(data,status) {
            $scope.detalleacademia = data;

            $('#calendar').fullCalendar('removeEvents')
            
            //TODO: Buscar los eventos de la academia seleccionada
            $('#calendar').fullCalendar('addEventSource','/api/eventos/'+id);            

       })
        .error(function(data,status) {
          console.log('Error: ' + data + status);
        });
    };


    // Cuando se hace submit (alta de alumno)
  $scope.submitForm = function() {

      $http.post('/api/academias', $scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.academias.push(data);
          })
          .error(function(data) {
            console.log('Error:' + data);
          });
      
  };


});


/*Controller para cargar y gestionar los entrenamientos*/
myApp.controller('entrenamientoController', function ($scope, $http) {
  $scope.formData = {};
    
    // Cuando se cargue la página, pide del API todos los TODOs
  
  $scope.loadEntrenamiento=function(id){
        
        $http.get('/api/entrenamientos/'+id)
          .success(function(data,status) {
            $scope.angentrenamiento = data;
       })
        .error(function(data,status) {
          console.log('Error: ' + data + status);
        });
    };

  $scope.marcarAlumno = function(alumnoid, entrenamientoid) {
          
          //console.log(alumnoid+"--"+ entrenamientoid);
          $http.put('/api/entrenamientos/'+entrenamientoid, {alumnoid:alumnoid})
          .success(function(data) {
            //console.log('Ok:' + data);
          })
          .error(function(data) {
            console.log('Error:' + data);
          });      
  };     

});


/*Controller para cargar y gestionar los alumnos*/

myApp.controller('alumnosController', function ($scope, $http , $moment ) {
  
  $http.get('/api/alumnos')
    .success(function(data) {
      $scope.alumnos = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  $scope.mostrarFormulario = false;
  $scope.formularioAlta = function(){
    $scope.mostrarFormulario = true;
  }


  $scope.cargarAlumno = function(id){

      $http.get('/api/alumnos/'+id)
      .success(function(data) {
        
        $scope.formData = data;

        console.log($scope.formData);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }


  $scope.cargarAlumnoYAsistencia = function(id){

      $http.get('/api/alumnosficha/'+id)
      .success(function(data) {
        
        $scope.formData = data;
        $scope.labels = ["Blanco", "Azul", "Morado", "Marron", "Negro"];
        
        var blanco = 0;
        var azul= 0;
        var morado= 0;
        var marron= 0;
        var negro= 0;

        if(data.graduaciones.blanco !=null){
          var fechab1 = moment(data.graduaciones.blanco.desde);
          var fechab2 = moment(data.graduaciones.blanco.hasta);
          blanco = fechab2.diff(fechab1, 'months');
        }

        if(data.graduaciones.azul !=null){
        var fechaa1 = moment(data.graduaciones.azul.desde);
        var fechaa2 = moment(data.graduaciones.azul.hasta);
        azul = fechaa2.diff(fechaa1, 'months');
        }

        /*if(data.graduaciones.morado !=null){
        var fecham1 = moment(data.graduaciones.morado.desde);
        var fecham2 = moment(data.graduaciones.morado.hasta);
        morado = fecham2.diff(fecham1, 'months');
        }

        if(data.graduaciones.marron !=null){
        var fechama1 = moment(data.graduaciones.marron.desde);
        var fechama2 = moment(data.graduaciones.marron.hasta);
        marron = fechama2.diff(fechama1, 'months');
        }

        if(data.graduaciones.negro !=null){
        var fechan1 = moment(data.graduaciones.negro.desde);
        var fechan2 = moment(data.graduaciones.negro.hasta);
        negro = fechan2.diff(fechan1, 'months');
        }*/

        $scope.data = [blanco, azul ,morado ,marron ,negro];

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  $http.get('/api/academias')
    .success(function(data) {
      $scope.academias = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Cuando se hace submit (alta de alumno)
  $scope.submitForm = function() {

    if($scope.formData._id == null){
        $http.post('/api/alumnos', $scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.alumnos.push(data);
            $scope.mostrarFormulario = false;
          })
          .error(function(data) {
            console.log('Error:' + data);
          });
    } else {
         $http.put('/api/alumnos/'+ $scope.formData._id, $scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.alumnos.push(data);
            $scope.mostrarFormulario = false;
          })
          .error(function(data) {
            console.log('Error:' + data);
          });

    }
  };

} );




myApp.controller('UserCtrl', function ($scope, $http, $window, $rootScope, $location) {
  $scope.user = {name: '', password: ''};
  $scope.isAuthenticated = false;
  $scope.welcome = '';
  $scope.message = '';

  $scope.submit = function () {
    $http
      .post('/autenticacion/login', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        var encodedProfile = data.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));
        $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
        $window.sessionStorage.nombre = profile.first_name + ' ' + profile.last_name;
        $window.location.href = '/inicio.html'


      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.nombre;
        $scope.isAuthenticated = false;

        $rootScope.isAutenticated = false;
        $rootScope.nombreus = '';
        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });
  };

  $scope.logout = function () {
    $scope.welcome = '';
    $scope.message = '';
    $scope.isAuthenticated = false;
    $rootScope.isAutenticated = false;
    $rootScope.nombreus = '';
    delete $window.sessionStorage.token;
    delete $window.sessionStorage.nombre;
    $window.location.href = '/login.html'
  };

});


myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'JWT ' + $window.sessionStorage.token;
        //$rootScope.prueba = 'yeahh';

        var encodedProfile = $window.sessionStorage.token.split('.')[1];
        var profile = JSON.parse(url_base64_decode(encodedProfile));

        $rootScope.isAutenticated = true;
        $rootScope.nombreus = profile.first_name + ' ' + profile.last_name;

      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
        
        $rootScope.isAutenticated = false;
        $rootScope.nombreus = '';
        $window.location.href = '/login.html'

      }
      return $q.reject(rejection);
    }
  };
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});








