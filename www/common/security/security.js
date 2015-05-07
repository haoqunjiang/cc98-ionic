import 'ionic';

import stateInterceptorsModule from './stateInterceptors';
import accountsModule from '../resources/accounts';
import LoginRoute from './login/login.route';

function SecurityRouter($stateProvider) {
  $stateProvider.state('login', LoginRoute);
}
SecurityRouter.$inject = ['$stateProvider'];

export default angular.module('security', [
  'ionic',
  //'security.httpInterceptors',
  stateInterceptorsModule.name,
  accountsModule.name
]).config(SecurityRouter);
