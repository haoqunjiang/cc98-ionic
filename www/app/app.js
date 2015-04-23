import 'ionic';

import 'js/controllers';
import 'js/services';

import 'font-awesome';

// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('cc98', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'app/app-tabs.html'
    })

    .state('tab.topics', {
      url: '/topics',
      views: {
        'tab-topics': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.boards', {
      url: '/boards',
      views: {
        'tab-boards': {
          templateUrl: 'app/boards/boards.html'
        }
      }
    })
    .state('tab.hot', {
      url: '/hot',
      views: {
        'tab-hot': {
          templateUrl: 'app/hot/hot.html'
        }
      }
    })

    .state('tab.me', {
      url: '/me',
      views: {
        'tab-me': {
          templateUrl: 'app/me/me.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/hot');
});
