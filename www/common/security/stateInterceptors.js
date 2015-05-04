/**
 * 每次切换页面时判断是否需要登录，如果需要就跳转到登录页
 * @param {Object} $rootScope
 */
function LoginInterceptor($rootScope) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {});
}

LoginInterceptor.$inject = ['$rootScope'];

export default angular.module('security.stateInterceptor', []).run(LoginInterceptor);
