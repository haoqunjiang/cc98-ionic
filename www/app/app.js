import 'ionic'; // 因为设置过 separateCSS 被 bundle 过，这里只引入了 js 部分
import '../bundles/ionic.app.css!'; // 自定义后的 ionic css

import 'maximnaidenov/angular-busy-tracker';
import 'maximnaidenov/angular-busy-tracker/dist/busy.css!'; // ugly but useful

// routes of submodules
import TopicsRoute from 'app/topics/topics.route.json!';  // 话题
import BoardsRoute from 'app/boards/boards.route.json!';  // 版面列表
import HotRoute from 'app/hot/hot.route.json!';           // 热门话题
import MeRoute from 'app/me/me.route.json!';              // 我
// 搜索页
// 搜索结果页
// 话题内容
// 回复主题
// 设置


angular.module('cc98', ['ionic'])

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
    .state('tab.topics', TopicsRoute)
    .state('tab.boards', BoardsRoute)
    .state('tab.hot', HotRoute)
    .state('tab.me', MeRoute);

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/hot');
});
