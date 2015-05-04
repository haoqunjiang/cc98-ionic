import 'core-js'; // ES Harmony shim
import 'ionic';   // 因为 bundle 设置过 separateCSS，此处只引入了 js 部分
import '../bundles/ionic.app.css!'; // 自定义编译后的 ionic css

import securityModule from '../common/security/index';

import AppRouter from './app.router';     // 路由
import InitNativeEnv from './app.native'; // 移动平台相关

export default angular.module('cc98', ['ionic', securityModule.name])
  .config(AppRouter)
  .run(InitNativeEnv);
