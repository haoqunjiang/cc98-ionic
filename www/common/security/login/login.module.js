import apiModule from '../../services/api';
import accountsModule from '../../resources/accounts';

import loginRoute from './login.route';

LoginRouter.$inject = ['$stateProvider'];
function LoginRouter($stateProvider) {
  $stateProvider.state('login', loginRoute);
}

export default angular.module('security.login', [
  apiModule.name,
  accountsModule.name
]).config(LoginRouter);
