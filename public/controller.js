angular.module('angularTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/academias')
    .success(function(data) {
      $scope.academias = data;
      console.log(data)
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

   // Cuando se cargue la página, pide del API todos los TODOs
  $http.get('/api/alumnos')
    .success(function(data) {
      $scope.alumnos = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
    
  

  $scope.marcarAlumno = function(eventid, alumnoid) {
          
          alert(eventid+'---'+alumnoid);

           $http.put('/api/entrenamientos/'+eventid, {alumnoid:alumnoid})
          .success(function(data) {
            console.log('Ok:' + data);
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
