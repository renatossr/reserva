angular.module('Reserva.models.profile', [])
  .factory('Profile', 
      [         'ActiveResource',
      function ( ActiveResource){
          
        function Profile(){
          this.number('id');
          this.string('name');
          this.string('email');

          this.hasMany('establishments');
        };

        Profile.inherits(ActiveResource.Base);
        Profile.api.set('http://reserva.dev/api/v1');

        return Profile;

  }]);
