import 'ionic';

import stateInterceptorsModule from './stateInterceptors';
import loginModule from './login/login.module';

export default angular.module('security', [
  'ionic',
  loginModule.name,
  stateInterceptorsModule.name
]);
