angular.module('Reserva')
  .controller('EstablishmentCtrl', ['$scope', 'Establishment', function ($scope, Establishment) {
    
    // Search method.
    $scope.search = function() {
      searchString = $scope.searchString.length >= 1 ? $scope.searchString : null;
      getEstablishmentList(searchString);
    };
    
    // Gets list of Establishments based on searchString. Pass searchString=null to return all
    getEstablishmentList = function(searchString){
      // Restangular method for accessing the list of establishments
      Establishment.where({search: searchString}, {lazy: true}).then(function(establishments){
        $scope.establishments = establishments;
      });
    };

    // Get initial list of establishments
    getEstablishmentList(null);

  }]);
