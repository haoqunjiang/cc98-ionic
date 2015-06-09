// 因为默认的 ion-nav-back-button 在目前的路由配置下没办法显示，所以写了这个
import template from './cc98BackButton.html!text';

export default angular
  .module('directives.cc98BackButton', ['ionic'])
  .directive('cc98BackButton', function($ionicNavBarDelegate) {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      link: function(scope, element, attrs) {
        scope.previousTitle = attrs.title || $ionicNavBarDelegate.title();
      }
    };
  });
