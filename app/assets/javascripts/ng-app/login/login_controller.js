angular.module('login', [])
  .controller('LoginController', [
              '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', '$state',
    function ( $scope,   $rootScope,   AUTH_EVENTS,   AuthService,   $state) {
    $scope.credentials = {
      email: '',
      password: ''
    };
    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        $state.go('establishmentList');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
    $scope.logout = function(){
      var user = AuthService.logout();
      $scope.setCurrentUser(user);
    };
  }]);
