angular.module('Reserva.models.appointment', [])
  .factory('Appointment', 
      [         'ActiveResource',
      function ( ActiveResource){
          
        function Appointment(){
          this.number('id');
          this.string('start_time');
          this.string('end_time');
          this.string('kind');
          this.number('position_id');

          this.belongsTo('position');
        };

        Appointment.inherits(ActiveResource.Base);
        Appointment.api.set('http://reserva.dev/api/v1');

        return Appointment;

  }]);
