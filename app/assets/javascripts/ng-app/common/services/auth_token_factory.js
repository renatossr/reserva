angular.module('auth.token', [])
  .factory('AuthToken', 
      [         '$window',
      function ( $window){
        var authToken = {};
        var store = $window.localStorage;
        var tokenKey = 'auth-token';

        
        // Token
        authToken.getToken = function(){
          return store.getItem(tokenKey);
        };

        authToken.setToken = function(token){
          if (token){
            store.setItem(tokenKey, token);
          } else {
            store.removeItem(tokenKey);
          }
        };

        return authToken;
}]);
