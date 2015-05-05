import 'ionic';

import stateInterceptorsModule from './stateInterceptors'
import LoginRoute from './login/login.route';

function SecurityRouter($stateProvider) {
  $stateProvider.state('login', LoginRoute);
}
SecurityRouter.$inject = ['$stateProvider'];

export default angular.module('security', [
  //'security.httpInterceptors',
  stateInterceptorsModule.name
]).config(SecurityRouter);
