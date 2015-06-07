import {tabsRoute} from 'app/tabs/tabs.route';
import {topicsRoute} from 'app/tabs/topics/topics.route'; // 话题
import {boardsRoute} from 'app/tabs/boards/boards.route'; // 版面列表
import {hotRoute} from 'app/tabs/hot/hot.route';          // 热门话题
import {meRoute} from 'app/tabs/me/me.route';             // 我
import {topicRoute} from 'app/topic/topic.route';         // 话题
import {commentRoute} from 'app/comment/comment.route';   // 回复
// 搜索页
// 搜索结果页
// 话题内容
// 回复主题
// 设置


function appRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', tabsRoute)
    .state('tabs.topics', topicsRoute)
    .state('tabs.boards', boardsRoute)
    .state('tabs.hot', hotRoute)
    .state('tabs.me', meRoute)
    .state('topic', topicRoute)
    .state('comment', commentRoute);

  $urlRouterProvider.otherwise('/tabs/hot');
}

// 对于 config 阶段用到的函数，似乎不支持以下这种方式进行依赖注入，因此直接用上面的函数就好不必再声明了
// AppRouter.$inject = ['$stateProvider, $urlRouterProvider'];

export default appRouter;
