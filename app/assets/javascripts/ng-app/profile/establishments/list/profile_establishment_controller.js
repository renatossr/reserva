angular.module('profile.establishment.list', [])
  .controller('ProfileEstablishmentListCtrl', 
      [        'Establishment', 'Position', 'Appointment', '$stateParams', 
      function (Establishment,   Position,   Appointment,   $stateParams) {
        profileEstablishmentList = this;

        profileEstablishmentList.establishments = profile.establishments;
      }]);
