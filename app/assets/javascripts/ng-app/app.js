angular.module('Reserva', [
      'ngAnimate',
      'ui.router',
      'restangular',
      'ActiveResource',
      'templates'
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
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'home.html',
          controller: 'HomeCtrl'
        })
        .state('establishments', {
          abstract: true,
          url: '/establishments',
          templateUrl: 'establishments/establishments.html',
        })
          .state('establishments.list', {
            url: '',
            templateUrl: 'establishments/list.html',
            controller: 'EstablishmentCtrl'
          })
          .state('establishments.detail', {
            url: '/{establishmentId:[0-9]{1,32}}',
            templateUrl: 'establishments/detail.html',
            controller: 'EstablishmentDetailCtrl'
          })
          .state('establishments.two', {
            url: '/two',
            templateUrl: 'establishments/two.html',
            controller: 'EstablishmentCtrl'
          })
          .state('establishments.three', {
            url: '/three',
            templateUrl: 'establishments/three.html'
          });

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode(true);

  }]);
