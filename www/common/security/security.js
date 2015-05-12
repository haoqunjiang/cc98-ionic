import 'ionic';

import httpInterceptorsModule from './httpInterceptors';
import stateInterceptorsModule from './stateInterceptors';
import loginModule from './login/login.module';

export default angular
  .module('security', [
    loginModule.name,
    httpInterceptorsModule.name,
    stateInterceptorsModule.name
  ]);
