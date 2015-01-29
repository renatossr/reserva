angular.module('Reserva.models.establishment', [])
  .factory('Establishment', 
      [         'ActiveResource',
      function ( ActiveResource){
          
        function Establishment(){
          this.number('id');
          this.string('name');
          this.string('address1');
          this.string('address2');
          this.string('city');
          this.string('state');
          this.string('country');
          this.string('zip');

          this.computedProperty('formattedAddress', function(){
            var formattedAddress = '';
            formattedAddress += this.address1 ? (this.address1) : '';
            formattedAddress += this.address2 ? (', ' + this.address2) : '';
            return formattedAddress;
          }, ['address1', 'address2']);
          
          this.computedProperty('formattedCityStateZip', function(){
            var formattedCityStateZip = '';
            formattedCityStateZip += this.city ? (this.city) : '';
            formattedCityStateZip += this.state ? (', ' + this.state) : '';
            formattedCityStateZip += this.zip ? (' ' + this.zip) : '';
            return formattedCityStateZip;
          }, ['city', 'state', 'zip']);

          this.belongsTo('profile');
          this.hasMany('positions');
        };

        Establishment.inherits(ActiveResource.Base);
        Establishment.api.set('http://reserva.dev/api/v1');

        Establishment.dependentDestroy('positions')
        
        return Establishment;

  }]);
