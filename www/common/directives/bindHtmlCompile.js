// from https://github.com/incuna/angular-bind-html-compile
// allows for HTML containing directives to be compiled
export default angular
  .module('directives.bindHtmlCompile', [])
  .directive('bindHtmlCompile', function ($compile) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch(function () {
          return scope.$eval(attrs.bindHtmlCompile);
        }, function (value) {
          element.html(value);
          $compile(element.contents())(scope);
        });
      }
    };
  });
