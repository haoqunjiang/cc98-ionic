// Client-Side Applications had better use implicit_grant
// see here -> http://wiki.dev.app.360.cn/index.php?title=OAuth2.0%E6%96%87%E6%A1%A3
// But as the website's implicit granted access token expires in such a short time (1200s currently),
// it is unrealistic to take this approach in a client app.
// So here I implemented an OAuth service with the authorization code approach.
import qs from 'nodelibs/querystring';
import secrets from '../../secrets.json!';

class LoginController {
  constructor($scope) {
    // ionic 对 controller as 支持有问题 https://github.com/driftyco/ionic/issues/3058
    $scope.ctrl = this;
  }

  login() {
    console.log('login')
    var authorize_url = 'http://login.cc98.org/oauth/authorize?' + qs.stringify({
      client_id: secrets.client_id,
      redirect_uri: 'http://localhost/callback',
      response_type: 'code'
    });

    var ref = window.open(authorize_url);
    ref.addEventListener('loadstart', function(evt) {
      if (evt.url.startsWith('http://localhost/callback')) {
        console.log(evt)
      }
    });
  }
}

LoginController.$inject = ['$scope'];

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