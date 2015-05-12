import 'ionic';
import 'driftyco/ng-cordova';
import 'driftyco/ng-cordova/dist/ng-cordova-mocks';

import accountsModule from '../resources/accounts';
import settingsModule from '../resources/settings';
import httpInterceptorsModule from '../security/httpInterceptors';

import ErrorCode from '../error-code';

function APIRequest($http, $cordovaToast, Accounts, settings) {
  let services = {
    get: get,
    post: post
  };
  return services;

  function get(url, data) {
    let config = {
      method: 'GET',
      url: settings.apiEndpoint + url,
      params: data
    };
    return _request(config);
  }

  function post(url, data) {
    let config = {
      method: 'POST',
      url: settings.apiEndpoint + url,
      data: data
    };
    return _request(config);
  }

  function _request(config) {
    return $http(config)
      .then((res) => res.data)
      .catch(err => {
        if (err === ErrorCode.ACCESS_TOKEN_EXPIRED) {
          Accounts.refresh().then(() => _request(config));
        } else if (err === ErrorCode.REFRESH_TOKEN_EXPIRED) {
          $cordovaToast.showShortBottom('授权已过期，请登录 98 并重新授权');
          Accounts.login().then(() => _request(config));
        }
      });
  }
}

APIRequest.$inject = ['$http', '$cordovaToast', 'Accounts', 'settings'];

export default angular
  .module('services.api', [
    'ngCordovaMocks',
    settingsModule.name,
    accountsModule.name,
    httpInterceptorsModule.name
  ])
  .factory('APIRequest', APIRequest);
