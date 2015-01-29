angular.module('profile.initialData', [])
.factory("ProfileCtrlInitialData", 
  [       'Profile', '$stateParams', '$q', 
  function(Profile,   $stateParams,   $q) {
    var initialData = {}; 
    initialData.init = function(profileId) {
      var profile = Profile.find({id: profileId});

      return $q.all([profile]).then(function(results){
        return {
          profile: results[0]
        };
      });
    }
    return initialData;
}]);
