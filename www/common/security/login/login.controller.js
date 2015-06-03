class LoginController {
  static get $inject() {
    return ['$scope', '$http', '$rootScope', '$state', '$cordovaStatusbar',
            'Accounts', 'APIRequest'];
  }

  constructor($scope, $http, $rootScope, $state, $cordovaStatusbar, Accounts, APIRequest) {
    // ionic 对 controller as 支持有问题 https://github.com/driftyco/ionic/issues/3058
    $scope.ctrl = this;

    this.$scope = $scope;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$cordovaStatusbar = $cordovaStatusbar;
    this.Accounts = Accounts;
    this.APIRequest = APIRequest;

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
   */
  login() {
    this.Accounts.login()
      // 这一步放在这里做是为了避免 Accounts 模块与 API 模块循环依赖
      // 以及不知道为什么只能放在匿名函数里调用才能成功
      .then(() => this._getMe())
      .then(() => this._return());
  }

  /**
   * get account information about the current user
   * @return {Promise}
   */
  _getMe() {
    return this.APIRequest.get('me')
      .then((userInfo) => {
        this.Accounts.setCurrent({
          userId: userInfo.id,
          userName: userInfo.name,
          userinfo: userInfo
        });
      });
  }

  /**
   * return to the state which the user was meant to go
   */
  _return() {
    this.$cordovaStatusbar.style(1);
    this.$state.go(this.$rootScope.returnToStateName, this.$rootScope.returnToStateParams);
  }
}

export default LoginController;
