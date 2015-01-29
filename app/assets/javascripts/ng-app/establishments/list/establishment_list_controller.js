angular.module('establishment.list', [])
  .controller('EstablishmentCtrl', 
                        ['Establishment', 'el', '$state',
                function (Establishment,   el,   $state) {
    
    establishmentList = this;
    establishmentList.establishments = el;
                  
    // Search method.
    establishmentList.search = function() {
      searchString = establishmentList.searchString.length >= 1 ? establishmentList.searchString : null;
      getEstablishmentList(searchString);
    };

    // Selects the establishment to have the details displayed
    establishmentList.selectEstablishment = function(id){
      $state.go('establishmentDetail', {establishmentId: id});
    }
    
    // Gets list of Establishments based on searchString. Pass searchString=null to return all
    getEstablishmentList = function(searchString){
      // Restangular method for accessing the list of establishments
      Establishment.where({search: searchString}, {lazy: true}).then(function(establishments){
        establishmentList.establishments = establishments;
      });
    };

    // Get initial list of establishments
    //getEstablishmentList(null);

  }]);
