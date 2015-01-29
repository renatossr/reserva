angular.module('Reserva')
.factory('AuthInterceptor', ['$q', '$injector', 'API_URL', function($q, $injector, API_URL){
  return {
    request: function(config){
      var AuthToken = $injector.get("AuthToken");
      var token = AuthToken.getToken();
      config.headers = config.headers || {};
      if ( token ){
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config || $q.when(config);
    },
    responseError: function(response){
      var AuthEvents = $injector.get('AUTH_EVENTS');
      var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp(API_URL + '/login'));
      if ( !matchesAuthenticatePath ){
        $injector.get('$rootScope').$broadcast({
          401: AuthEvents.notAuthenticated,
          403: AuthEvents.notAuthorized,
          419: AuthEvents.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    }
  }
}])
.config(['$httpProvider', function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');  
}]);
