import accountsModule from '../../resources/accounts';
import loginRoute from './login.route';

function LoginRouter($stateProvider) {
  $stateProvider.state('login', loginRoute);
}
LoginRouter.$inject = ['$stateProvider'];

export default angular.module('security.login', [
  accountsModule.name
]).config(LoginRouter);
