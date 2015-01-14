angular.module('establishment.detail.initialData', [])
.factory("EstablishmentDetailCtrlInitialData", 
  [       'Establishment', '$stateParams', '$q', 
  function(Establishment,   $stateParams,   $q) {
    var initialData = {}; 
    initialData.init = function(establishmentId) {
      var establishment = Establishment.find({id: establishmentId});

      return $q.all([establishment]).then(function(results){
        return {
          establishment: results[0]
        };
      });
    }
    return initialData;
}]);
