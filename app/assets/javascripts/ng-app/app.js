angular.module('Reserva', [
      'establishments',
      'profile',
      'login',
      'ngAnimate',
      'ui.router',
      'utils.autofocus',
      'utils.ui-view',
      'restangular',
      'ActiveResource',
      'templates',
      'checklist-model',
      'Reserva.constants',
      'auth',
      'session'
      ]
)
.run(
  [          '$rootScope', '$state', '$stateParams', 'AUTH_EVENTS', 'AuthService', 'Session',
    function ($rootScope,   $state,   $stateParams,   AUTH_EVENTS,   AuthService,   Session) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        
        var executeChange = function(){

          var viewsToFlush = {};
          var i=0;
          var authorizedRoles = toState.data.authorizedRoles;


          if ( !AuthService.isAuthorized(authorizedRoles) ){
            event.preventDefault();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
            if ( fromState.url === '^' ) {
              $state.go( 'home' );
            }
          }

          if (fromState.path) {
            for (i=fromState.path.length-1; i>=0; i--) {
              var s = fromState.path[i];

              if (toState.path && s === toState.path[i])
                break;

              for(var j=0; j<s.views.length; j++) {
                viewsToFlush[s.views[j]] = true;
              }
            }
          }

          if (toState.path) {
            for (i+=1; i<toState.path.length; i++) {
              var s = toState.path[i];

              for(var j=0; j<s.views.length; j++) {
                viewsToFlush[s.views[j]] = true;
              }
            }
          }

          event.viewsToFlush = viewsToFlush;

        }
        
        executeChange();
      
      });
      


      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ] 
)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$locationProvider', 'USER_ROLES', 
    function ($stateProvider,   $urlRouterProvider,   $locationProvider,   USER_ROLES) {
      


      
      // CODE BELOW FOR ANIMATION WHILE LOADING VIEW
      $stateProvider.decorator('path', function(state, getPath) {
        var path = getPath(state);

        state.self.path = [];

        for (var i=0; i<path.length; i++) {
          state.self.path.push(path[i].self);
        }
        return path;
      });

      $stateProvider.decorator('views', function(state, getViews) {
        var views = getViews(state);

        state.self.views = [];
        for (var name in views) {
          if (views.hasOwnProperty(name)) {
            state.self.views.push(name);
          }
        }
        return views;
      });
      // CODE ABOVE FOR ANIMATION WHILE LOADING VIEW 
      
      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'ng-app/home/home.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      
      // Login States
      .state('login', {
        url: '/login',
        templateUrl: 'ng-app/login/login.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })

      //Establishments States
      .state('establishmentList', {
        url: '/establishments',
        templateUrl: 'ng-app/establishments/list/list.html',
        controller: 'EstablishmentCtrl as establishmentList',
        data: {
          authorizedRoles: [USER_ROLES.all]
        },
        resolve: {
          el: ['Establishment', function(Establishment){
            return Establishment.all();
          }]
        }
      })
      .state('establishmentDetail', {
        url: '/establishments/:establishmentId',
        templateUrl: 'ng-app/establishments/detail/detail.html',
        controller: 'EstablishmentDetailCtrl as establishmentDetail',
        data: {
          authorizedRoles: [USER_ROLES.all]
        },
        resolve: {
          initialData: ['EstablishmentDetailCtrlInitialData', '$stateParams', function(EstablishmentDetailCtrlInitialData, $stateParams){
            return EstablishmentDetailCtrlInitialData.init($stateParams.establishmentId);
          }]
        } 
      })

      // Profile states
      .state('profile', {
        abstract: true,
        url: '/profile/:profileId',
        templateUrl: 'ng-app/profile/profiles.html',
        controller: 'ProfileCtrl as profile',
        data: {
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.registered]
        }
      })
      .state('profile.detail', {
        url: '',
        views: {
          'content@profile': {
            templateUrl: 'ng-app/profile/detail/detail.html',
            controller: 'ProfileDetailCtrl as profileDetail',
            resolve: {
              initialData: ['ProfileDetailCtrlInitialData', '$stateParams', function(ProfileDetailCtrlInitialData, $stateParams){
                return ProfileDetailCtrlInitialData.init($stateParams.profileId);
              }]
            }
          }
        }
      })
      .state('profile.establishments', {
        url: '/establishments',
        views: {
          'content@profile': {
            templateUrl: 'ng-app/profile/establishments/list/profile_establishment_list.html',
            controller: 'ProfileEstablishmentListCtrl as profileEstablishmentList'
          }
        }
      })
      .state('profile.establishments.detail', {
        url: '/establishments/:establishmentId',
        views: {
          'content@profile': {
            templateUrl: 'ng-app/profile/establishments/detail/profile_establishment_detail.html',
            controller: 'ProfileEstablishmentDetailCtrl as profileEstablishmentDetail'
          }
        }
      });
      
      
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
}]);
