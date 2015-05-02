// Client-Side Applications had better use implicit_grant
// see here -> http://wiki.dev.app.360.cn/index.php?title=OAuth2.0%E6%96%87%E6%A1%A3
// But as the website's implicit granted access token expires in such a short time (1200s currently),
// it is unrealistic to take this approach in a client app.
// So here I implemented an OAuth service with the authorization code approach.
import qs from 'nodelibs/querystring';
import secrets from '../../secrets.json!';

class LoginController {
  constructor($scope, $http) {
    // ionic 对 controller as 支持有问题 https://github.com/driftyco/ionic/issues/3058
    $scope.ctrl = this;

    this.$scope = $scope;
    this.$http = $http;

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
      client_id: secrets.client_id,
      redirect_uri: secrets.redirect_uri,
      response_type: 'code',
      grant_type: 'authorization_code',
      scope: 'all*'
    });
    var ref = window.open(authorizeUrl, '_blank');
    ref.addEventListener('loadstart', (evt) => {
      if (evt.url.startsWith(secrets.redirect_uri)) {
        var {code, error} = qs.parse(evt.url.split('?')[1]);
        this._toggleKeyboardAccessoryBar({show: false});

        if (error) {
          alert('Failed to get authorization code!');
        } else {
          this._getToken(code);
        }

        //ref.close();
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
    }).success(function(data) {
      var {access_token, token_type, expires_in, refresh_token} = data;
    }).error(function(err) {
      alert('获取 Access Token 错误');
    });
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

LoginController.$inject = ['$scope', '$http'];

export default LoginController;


/*
var requestToken = "";
var accessToken = "";
var clientId = "client_id_here";
var clientSecret = "client_secret_here";
var refreshTokenExpiry = 1200;  // 目前 98 的实现有问题，后续会改的

var exampleApp = angular.module('example', ['ionic'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            .state('secure', {
                url: '/secure',
                templateUrl: 'templates/secure.html',
                controller: 'SecureController'
            });
        $urlRouterProvider.otherwise('/login');
    });


exampleApp.controller('LoginController', function($scope, $http, $location) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    $scope.login = function() {
        var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
        ref.addEventListener('loadstart', function(event) {
            if((event.url).startsWith("http://localhost/callback")) {
                requestToken = (event.url).split("code=")[1];
                $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                    .success(function(data) {
                        accessToken = data.access_token;
                        $location.path("/secure");
                    })
                    .error(function(data, status) {
                        alert("ERROR: " + data);
                    });
                ref.close();
            }
        });
    }

    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }

});

exampleApp.controller('SecureController', function($scope, $http) {

    $scope.accessToken = accessToken;

});
 */
