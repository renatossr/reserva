angular.module('establishment.detail.initialData', [])
.factory("EstablishmentDetailCtrlInitialData", 
  [       'Establishment', '$stateParams', '$q', 
  function(Establishment,   $stateParams,   $q) {
  
    return function() {
      var establishment = Establishment.find({id: $stateParams.establishmentId});

      return $q.all([establishment]).then(function(results){
        return {
          establishment: results[0]
        };
      });
    }
}]);
