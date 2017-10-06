angular.module('angularTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/academias')
    .success(function(data) {
      $scope.academias = data;
      //console.log(data)
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

}

function entrenamientoController($scope, $http) {
  $scope.formData = {};

  
  // Cuando se cargue la página, pide del API todos los TODOs
  /*$http.get('/api/alumnos')
    .success(function(data) {
      $scope.alumnos = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });*/
    
    // Cuando se cargue la página, pide del API todos los TODOs
  
    $scope.loadEntrenamiento=function(id){
        
        $http.get('/api/entrenamientos/'+id)
          .success(function(data) {
            $scope.angentrenamiento = data;
       })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };


    $scope.alumnomarcado = function(alumnoid){
      return true;

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

}


function alumnosController($scope, $http) {
  
  // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/alumnos')
    .success(function(data) {
      $scope.alumnos = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });


    // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/academias')
    .success(function(data) {
      $scope.academias = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

    // function to submit the form after all validation has occurred            
  $scope.submitForm = function() {

      $http.post('/api/alumnos', $scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.alumnos.push(data);
          })
          .error(function(data) {
            console.log('Error:' + data);
          });
      
  };

} 
