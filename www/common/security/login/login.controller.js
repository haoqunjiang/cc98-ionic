class LoginController {
  constructor($scope, $http, $rootScope, $state, $cordovaStatusbar, Accounts) {
    // ionic 对 controller as 支持有问题 https://github.com/driftyco/ionic/issues/3058
    $scope.ctrl = this;

    this.$scope = $scope;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$cordovaStatusbar = $cordovaStatusbar;
    this.Accounts = Accounts;

    $cordovaStatusbar.style(0); // set to default style
  }

  /**
   * cancel login and return to the state where the user was from
   */
  cancel() {
    this.$cordovaStatusbar.style(1); // light content
    this.$state.go(this.$rootScope.fromStateName, this.$rootScope.fromStateParams);
  }

  /**
   * OAuth 登录，采用 Authorization Code 方式
   * @todo 增加 state 参数
   */
  login() {
    this.Accounts.login().then(this._return);
  }

  /**
   * return to the state which the user was meant to go
   */
  _return() {
    this.$cordovaStatusbar.style(1);
    this.$state.go(this.$rootScope.returnToStateName, this.$rootScope.returnToStateParams);
  }
}

LoginController.$inject = ['$scope', '$http', '$rootScope', '$state', '$cordovaStatusbar', 'Accounts'];

export default LoginController;
