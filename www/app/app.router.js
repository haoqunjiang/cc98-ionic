import TabsRoute from 'app/tabs/tabs.route.json!';
import TopicsRoute from 'app/tabs/topics/topics.route.json!'; // 话题
import BoardsRoute from 'app/tabs/boards/boards.route.json!'; // 版面列表
import HotRoute from 'app/tabs/hot/hot.route.json!';          // 热门话题
import MeRoute from 'app/tabs/me/me.route.json!';             // 我
// 搜索页
// 搜索结果页
// 话题内容
// 回复主题
// 设置


function AppRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', TabsRoute)
    .state('tabs.topics', TopicsRoute)
    .state('tabs.boards', BoardsRoute)
    .state('tabs.hot', HotRoute)
    .state('tabs.me', MeRoute);

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs/hot');
}

// 对于 config 阶段用到的函数，似乎不支持以下这种方式进行依赖注入，因此直接用上面的函数就好不必再声明了
// AppRouter.$inject = ['$stateProvider, $urlRouterProvider'];

export default AppRouter;
