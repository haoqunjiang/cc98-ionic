import LoginRoute from 'app/login/login.route';          // 登录

import TabsRoute from 'app/tabs/tabs.route';
import TopicsRoute from 'app/tabs/topics/topics.route'; // 话题
import BoardsRoute from 'app/tabs/boards/boards.route'; // 版面列表
import HotRoute from 'app/tabs/hot/hot.route';          // 热门话题
import MeRoute from 'app/tabs/me/me.route';             // 我
// 搜索页
// 搜索结果页
// 话题内容
// 回复主题
// 设置

function AppRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', LoginRoute)

    .state('tabs', TabsRoute)
    .state('tabs.topics', TopicsRoute)
    .state('tabs.boards', BoardsRoute)
    .state('tabs.hot', HotRoute)
    .state('tabs.me', MeRoute);

  $urlRouterProvider.otherwise('/login');
}

// 对于 config 阶段用到的函数，似乎不支持以下这种方式进行依赖注入，因此直接用上面的函数就好不必再声明了
// AppRouter.$inject = ['$stateProvider, $urlRouterProvider'];

export default AppRouter;
