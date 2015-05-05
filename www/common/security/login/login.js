// Client-Side Applications had better use implicit_grant
// see here -> http://wiki.dev.app.360.cn/index.php?title=OAuth2.0%E6%96%87%E6%A1%A3
// But as the website's implicit granted access token expires in such a short time (1200s currently),
// it is unrealistic to take this approach in a client app.
// So here I implemented an OAuth service with the authorization code approach.
import qs from 'nodelibs/querystring';
import secrets from '../../../secrets.json!';

class LoginController {
  constructor($scope, $http, $rootScope, $state, Accounts) {
    // ionic 对 controller as 支持有问题 https://github.com/driftyco/ionic/issues/3058
    $scope.ctrl = this;

    this.$scope = $scope;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.Accounts = Accounts;

    this.authorizeEndpoint = 'http://login.cc98.org/oauth/authorize';
    this.tokenEndpoint = 'http://login.cc98.org/oauth/token';
    //this.tokenEndpoint = 'http://127.0.0.1:3000/';

    this.refreshTokenExpiry = 1200; // 目前 98 的实现有问题，时间太短，后续会改的
  }

  /**
   * OAuth 登录，采用 Authorization Code 方式
   * @todo 增加 state 参数
   */
  login() {
    this._toggleKeyboardAccessoryBar({show: true});

    var authorizeUrl = this.authorizeEndpoint + '?' + qs.stringify({
      response_type: 'code',
      grant_type: 'authorization_code',
      client_id: secrets.client_id,
      redirect_uri: secrets.redirect_uri,
      scope: secrets.scope
    });
    var ref = window.open(authorizeUrl, '_blank');
    ref.addEventListener('loadstart', (evt) => {
      if (evt.url.startsWith(secrets.redirect_uri)) {
        var {code, error} = qs.parse(evt.url.split('?')[1]);
        this._toggleKeyboardAccessoryBar({show: false});

        if (error) {
          alert('Failed to get authorization code!');
        } else {
          this._getTokens(code);
        }

        ref.close();
      }
    });
  }

  _getTokens(code) {
    this.$http({
      method: 'POST',
      url: this.tokenEndpoint,
      data: {
        grant_type: 'authorization_code',
        client_id: secrets.client_id,
        client_secret: secrets.client_secret,
        redirect_uri: secrets.redirect_uri,
        code: code
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj){
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      }
    }).success((data) => {
      var {access_token, token_type, expires_in, refresh_token} = data;
      this.Accounts.setCurrent({access_token: access_token});

      this._return();
    }).error(() => {
      alert('Failed to get access token!');
    });
  }

  /**
   * return to the state which the user was meant to go
   */
  _return() {
    this.$state.go(this.$rootScope.returnToStateName, this.$rootScope.returnToStateParams);
  }

  /**
   * toggle keyboard accessory bar
   * @param  {Object}  params
   * @param  {boolean} params.show set this to true to show the bar or false to hide
   */
  _toggleKeyboardAccessoryBar(params) {
    // 重新关掉键盘的 AccessoryBar，毕竟只有填表单时用得到
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!params.show);
    }
  }
}

LoginController.$inject = ['$scope', '$http', '$rootScope', '$state', 'Accounts'];

export default LoginController;
