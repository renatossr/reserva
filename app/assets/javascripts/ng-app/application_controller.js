angular.module('Reserva')
.controller('ApplicationCtrl', 
  [       '$scope', 'USER_ROLES', 'AuthService', 
  function($scope,   USER_ROLES,   AuthService){
    $scope.currentUser = {
      id: null,
      name: null,
      role: 'guest'
    };
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function(user){
      $scope.currentUser = user;
    };

    AuthService.getUser().then(function(user){
      $scope.setCurrentUser(user);
    });

  }]);
