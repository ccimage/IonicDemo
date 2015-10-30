// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://www.taishigame.com:81/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([]);
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.userlist', {
    url: '/userlist/:gameId',
    views: {
      'menuContent': {
        templateUrl: 'templates/userlist.html',
        controller: 'WhoIsPlayCtrl'
      }
    }
  })

  .state('app.chat', {
    url: '/chat/:userId',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl'
      }
    }
  })

  .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.gamelists', {
      url: '/gamelists',
      views: {
        'menuContent': {
          templateUrl: 'templates/gamelists.html',
          controller: 'GamelistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/gamelists/:gamelistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/gamelist.html',
        controller: 'GamelistCtrl'
      }
    }
  })
  .state('app.gameplay', {
    url: '/gameplay/:gameId',
    views: {
      'menuContent': {
        templateUrl: 'templates/gameplay.html',
        controller: 'GamePlayCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/gamelists');
});