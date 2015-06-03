import 'ionic';
import accountsModule from '../resources/accounts';

LoginInterceptor.$inject = ['$rootScope', '$location', 'Accounts'];
function LoginInterceptor($rootScope, $location, Accounts) {
  // 每次切换页面时判断是否需要登录，如果需要就跳转到登录页
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.requiresLogin && !isLoggedIn()) {
      event.preventDefault();

      $rootScope.fromStateName = fromState.name;
      $rootScope.fromStateParams = fromParams;
      $rootScope.returnToStateName = toState.name;
      $rootScope.returnToStateParams = toParams;

      // 直接跳转的话有一定概率不会起作用
      // https://github.com/angular/angular.js/issues/9607
      $rootScope.$evalAsync(function() {
        $location.path('/login');
      });
    }
  });

  function isLoggedIn() {
    return !!Accounts.getCurrent();
  }
}

export default angular
  .module('security.stateInterceptor', [accountsModule.name])
  .run(LoginInterceptor);
