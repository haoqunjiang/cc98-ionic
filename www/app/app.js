import 'ionic'; // 因为设置过 separateCSS 被 bundle 过，这里只引入了 js 部分
import '../bundles/ionic.app.css!'; // 自定义后的 ionic css

// import 'maximnaidenov/angular-busy-tracker';
// import 'maximnaidenov/angular-busy-tracker/dist/busy.css!'; // ugly but useful

// 路由
import AppRouter from './app.router';
// 移动平台相关
import AppPlatform from './app.platform';

// OAuth2 实现
import OAuth2 from '../common/utils/oauth2';

export default angular.module('cc98', ['ionic'])
  .config(AppRouter)
  .run(AppPlatform);
