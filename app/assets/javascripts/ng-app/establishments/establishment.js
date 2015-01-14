angular.module('establishments', [
  'ui.router',
  'Reserva.models.establishment',
  'Reserva.models.postion',
  'Reserva.models.appointment',
  'establishment.list',
  'establishment.detail'
])
.config(
  [          '$stateProvider', 
    function ($stateProvider) {

      $stateProvider
      .state('establishmentList', {
        url: '/establishments',
        templateUrl: 'establishments/list/list.html',
        controller: 'EstablishmentCtrl as establishmentList',
        resolve: {
          el: ['Establishment', function(Establishment){
            return Establishment.all();
          }]
        }
      })
      .state('establishmentDetail', {
        url: '/establishments/:establishmentId',
        templateUrl: 'establishments/detail/detail.html',
        controller: 'EstablishmentDetailCtrl as establishmentDetail',
        resolve: {
          initialData: ['EstablishmentDetailCtrlInitialData', '$stateParams', function(EstablishmentDetailCtrlInitialData, $stateParams){
            return EstablishmentDetailCtrlInitialData.init($stateParams.establishmentId);
          }]
        } 
      });

      /* Example of abstract parent with named views
       *
       *
       *
      .state('establishmentDetail', {
        abstract: true,
        url: '/establishments/:establishmentId',
        templateUrl: 'establishments/establishments.html'
      })
      .state('establishmentDetail.detail', {
        url: '',
        views: {
          'column1@establishmentDetail': {
            templateUrl: 'establishments/list/list.html',
            controller: 'EstablishmentCtrl as establishmentList',
            resolve: {
              el: ['Establishment', function(Establishment){
                return Establishment.all();
              }]
            }
          },
          'column2@establishmentDetail': {
            templateUrl: 'establishments/detail.html',
            controller: 'EstablishmentDetailCtrl as establishmentDetail',
            resolve: {
              es: ['Establishment', '$stateParams', function(Establishment, $stateParams){
                return Establishment.find({id: $stateParams.establishmentId});
              }]
            }
          }
        }
      });*/
}]);
