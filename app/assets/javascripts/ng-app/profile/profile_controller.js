angular.module('profile', [
  'ui.router',
  'Reserva.models.profile',
  'Reserva.models.establishment',
  'Reserva.models.position',
  'Reserva.models.appointment',
  'profile.detail',
  'profile.establishment.list'
])
.controller('ProfileCtrl', 
[        'Establishment', 'Position', 'Appointment', '$stateParams',
function (Establishment,   Position,   Appointment,   $stateParams) {
  profile = this;
}]);
