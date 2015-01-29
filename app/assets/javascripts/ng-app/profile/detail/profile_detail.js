angular.module('profile.detail', ['profile.detail.initialData'])
  .controller('ProfileDetailCtrl', 
      [        'Establishment', 'Position', 'Appointment', '$stateParams', 'initialData', 
      function (Establishment,   Position,   Appointment,   $stateParams,   initialData) {
        profileDetail = this;

        profile.profile = initialData.profile;
      }]);
