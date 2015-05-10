import apiModule from '../../services/api';
import accountsModule from '../../resources/accounts';

import loginRoute from './login.route';

function LoginRouter($stateProvider) {
  $stateProvider.state('login', loginRoute);
}
LoginRouter.$inject = ['$stateProvider'];

export default angular.module('security.login', [
  apiModule.name,
  accountsModule.name
]).config(LoginRouter);
