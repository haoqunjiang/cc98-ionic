import 'ionic';
import LoginRoute from './login/login.route';

function SecurityRouter($stateProvider) {
  $stateProvider.state('login', LoginRoute);
}
SecurityRouter.$inject = ['$stateProvider'];

export default angular.module('security', [
  'security.httpInterceptors',
  'security.stateInterceptors'
]).config(SecurityRouter);
