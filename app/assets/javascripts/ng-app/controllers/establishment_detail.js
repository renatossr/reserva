angular.module('Reserva')
  .controller('EstablishmentDetailCtrl', 
      [        '$scope', 'Establishment', '$stateParams', 
      function ($scope,   Establishment,   $stateParams) {

    // Gets the detail of the Establishment based on the Id.
    getEstablishmentDetail = function(establishmentId){
      // Restangular method for accessing the establishment detail
      Establishment.find({id: establishmentId}).then(function(establishment){
        $scope.establishment = establishment;
      });
    };

    // Get the establishment
    getEstablishmentDetail($stateParams.establishmentId);

  }]);
