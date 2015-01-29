angular.module('Reserva.constants', [])
  .constant('API_URL', 'http://reserva.dev/api/v1')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-sucess',
    loginFailed: 'auth-login-failed',
    logoutSucess: 'auth-logout-sucess',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    registered: 'registered',
    guest: 'guest'
  });
