angular.module('auth', ['auth.token'])
  .factory('AuthService', 
      [         '$http', '$q', 'API_URL', 'USER_ROLES', 'Session', 'AuthToken',
      function ( $http,   $q,   API_URL,   USER_ROLES,   Session,   AuthToken){
        var authService = {};

        authService.login = function(credentials){
          return $http
            .post(API_URL + '/login', credentials)
            .then(function(response){
              user = response.data.user;
              AuthToken.setToken(response.data.auth_token);
              Session.create(user.id, user.name, user.role);
              return user;
          });
        };

        authService.logout = function(){
          user = {};
          user.role = 'guest';
          AuthToken.setToken();
          Session.destroy(); 
          return user;
        };

        authService.getUser = function(){
          if (AuthToken.getToken()){
            return $http
              .get(API_URL + '/me')
              .then(function(response){
                user = response.data.user;
                Session.create(user.id, user.name, user.role);
                return user;
              });
          } else{
            return $q.reject({ data: 'client has no auth token' });
          }
        };

        authService.isAuthenticated = function(){
          return !!Session.userId;
        };

        authService.isAuthorized = function(authorizedRoles){
          if (!angular.isArray(authorizedRoles)){
            authorizedRoles = [authorizedRoles];
          }
          return ( (authorizedRoles.indexOf(Session.userRole) !== -1) || (authorizedRoles.indexOf(USER_ROLES.all) !== -1) ) // check for authService.isAuthenticated() in the return to ensure that any user has to be logged in
        };

        return authService;
  }]);
