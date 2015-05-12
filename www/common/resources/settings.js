// 一些用户可以设置的值
import 'ionic';

let settings = {
  apiEndpoint: 'http://api.cc98.org/',
  authorizeEndpoint: 'http://login.cc98.org/oauth/authorize',
  tokenEndpoint: 'http://login.cc98.org/oauth/token'
};

export default angular
  .module('settings', [])
  .value('settings', settings);
