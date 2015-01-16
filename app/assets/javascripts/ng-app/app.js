angular.module('Reserva', [
      'establishments',
      'ngAnimate',
      'ui.router',
      'restangular',
      'ActiveResource',
      'templates',
      'checklist-model'
      ]
)
.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ] 
)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function ($stateProvider,   $urlRouterProvider,   $locationProvider) {
      
      $urlRouterProvider.otherwise('/');
      
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'home/home.html'
        });
      
      $locationProvider.html5Mode(true);
      
}]);
