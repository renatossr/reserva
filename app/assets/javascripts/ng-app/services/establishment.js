angular.module('Reserva')
  .factory('Establishment', 
      [         'ActiveResource',
      function ( ActiveResource){
          
        function Establishment(){
          this.number('id');
          this.string('name');

          this.hasMany('positions');
        };

        Establishment.inherits(ActiveResource.Base);
        Establishment.api.set('http://reserva.dev/api/v1');

        Establishment.dependentDestroy('positions')
        
        return Establishment;

  }]);
