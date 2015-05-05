import accountsModule from '../resources/accounts';
/**
 * 每次切换页面时判断是否需要登录，如果需要就跳转到登录页
 * @param {Object} $rootScope
 */
function LoginInterceptor($rootScope, $location, Accounts) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    if (toState.data && toState.data.requiresLogin && !isLoggedIn()) {
      $rootScope.returnToStateName = toState.name;
      $rootScope.returnToStateParams = toParams;
      $location.path('/login');
    }
  });

  function isLoggedIn() {
    return !!Accounts.getCurrent();
  }
}

LoginInterceptor.$inject = ['$rootScope', '$location', 'Accounts'];

export default angular.module('security.stateInterceptor', [
  accountsModule.name
]).run(LoginInterceptor);
