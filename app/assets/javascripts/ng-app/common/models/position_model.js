angular.module('Reserva.models.position', [])
  .factory('Position', 
      [         'ActiveResource',
      function ( ActiveResource){
          
        function Position(){
          this.number('id');
          this.string('name');
          this.number('establishment_id');

          this.belongsTo('establishment');
          this.hasMany('appointments');
        };

        Position.inherits(ActiveResource.Base);
        Position.api.set('http://reserva.dev/api/v1');

        return Position;

  }]);
