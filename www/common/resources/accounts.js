/* eslint-disable camelcase */
import 'ionic';
import 'driftyco/ng-cordova';
import 'driftyco/ng-cordova/dist/ng-cordova-mocks';
import 'gsklee/ngStorage';
import qs from 'nodelibs/querystring';

import settingsModule from './settings';

import secrets from '../../secrets.json!';

const AUTH_SCOPE = 'all*';
const REFRESH_TOKEN_EXPIRES_IN = 1200; // 目前 98 的实现有问题，时间太短，后续会改的

function Accounts($http, $q, $localStorage, $cordovaToast, $cordovaKeyboard, settings) {
  let services = {
    get: get,
    set: set,

    all: all,

    getCurrent: getCurrent,
    setCurrent: setCurrent,

    login: login,
    logout: logout,
    refresh: refresh
  };
  return services;


  /**
   * get a stored account by userName or userId
   * (if both provided, the userName has higher priority during search)
   * @param  {string} options.userName
   * @param  {number} options.userId
   * @return {Object} the found account or null
   */
  function get({userName, userId}) {
    return $localStorage.find((x) => x.userName === userName || x.userId === userId);
  }

  /**
   * append/update a account in the accounts array
   * @param {object} user the user account to set
   */
  function set(user) {
    $localStorage.accounts = $localStorage.accounts || [];
    let found = $localStorage.accounts.find(x => x.userName === user.userName);
    if (found) {
      Object.assign(found, user);
    } else {
      $localStorage.accounts.push(user);
    }
  }

  /**
   * get all accounts
   * @return {array} array of all stored accounts,
   * the reason to use array rather than object is that the user needs to see
   * the accounts in order when managing accounts
   */
  function all() {
    return $localStorage.accounts;
  }

  /**
   * get current user
   * @return {Object} the current user's account info
   */
  function getCurrent() {
    return $localStorage.current;
  }

  /**
   * set current user with the given params
   * @param {Object} user the user account object
   * @param {string} user.access_token
   * @param {number} user.access_token_expires timestamp indicating when access_token expires
   * @param {string} user.refresh_token
   * @param {number} user.refresh_token_expires timestamp indicating when access_token expires
   * @param {id}     [user.userId]
   * @param {string} [user.userName]
   * @param {string} [user.avatar]
   */
  function setCurrent(user) {
    $localStorage.current = Object.assign($localStorage.current || {}, user);
    // 如果有用户名，就 push/update 它到 accounts 数组中
    if ($localStorage.current.userName) {
      set($localStorage.current);
    }
  }

  // Client-Side Applications had better use implicit_grant
  // see here -> http://wiki.dev.app.360.cn/index.php?title=OAuth2.0%E6%96%87%E6%A1%A3
  // But as the website's implicit granted access token expires in such a short time (1200s currently),
  // that it is unrealistic to take this approach in a client app.
  // So here I implemented an OAuth service with the authorization code approach.

  /**
   * login
   * @return {Promise} [description]
   */
  function login() {
    let deferred = $q.defer();

    $cordovaKeyboard.hideAccessoryBar(false);
    let authorizeUrl = settings.authorizeEndpoint + '?' + qs.stringify({
      response_type: 'code',
      grant_type: 'authorization_code',
      client_id: secrets.client_id,
      redirect_uri: secrets.redirect_uri,
      scope: AUTH_SCOPE
    });
    let ref = window.open(authorizeUrl, '_blank');
    ref.addEventListener('loadstart', (evt) => {
      if (!evt.url.startsWith(secrets.redirect_uri)) { return; }
      $cordovaKeyboard.hideAccessoryBar(true);

      let {code, error} = qs.parse(evt.url.split('?')[1]);
      if (error) {
        deferred.reject('Failed to get authorization code!');
      } else {
        deferred.resolve(code);
      }
    });

    return deferred.promise
      .finally(() => ref.close()) // 先关窗口免得用户看到跳转页
      .then(_getTokens);
  }

  /**
   * refresh access token with refresh token
   * @return {Promise}
   */
  function refresh() {
    return $http({
      method: 'POST',
      url: settings.tokenEndpoint,
      data: {
        grant_type: 'refresh_token',
        refresh_token: $localStorage.current.refresh_token,
        client_id: secrets.client_id,
        client_secret: secrets.client_secret,
        redirect_uri: secrets.redirect_uri
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      transformRequest: qs.stringify
    }).success(({access_token, expires_in}) => {
      let access_token_expiry = Date.now() + expires_in * 1000;

      setCurrent({access_token, access_token_expiry});
    }).error((data, status) => {
      throw new Error(`HTTP Error ${status}. Failed to refresh token!`);
    });
  }

  /**
   * get access_token & refresh_token with oauth authorization code
   * @param  {string} code authorization code
   * @return {Promise}
   */
  function _getTokens(code) {
    return $http({
      method: 'POST',
      url: settings.tokenEndpoint,
      data: {
        grant_type: 'authorization_code',
        client_id: secrets.client_id,
        client_secret: secrets.client_secret,
        redirect_uri: secrets.redirect_uri,
        code: code
      },
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      transformRequest: qs.stringify
    }).success(({access_token, expires_in, refresh_token}) => {
      let access_token_expiry = Date.now() + expires_in * 1000;
      let refresh_token_expiry = Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000;

      setCurrent({access_token, refresh_token, access_token_expiry, refresh_token_expiry});
    }).error((data, status) => {
      throw new Error(`HTTP Error ${status}. Failed to get tokens!`);
    });
  }

  /**
   * logout the current account and delele cookie
   * @return {Promise}
   */
  function logout() {}
}

Accounts.$inject = ['$http', '$q', '$localStorage', '$cordovaToast', '$cordovaKeyboard', 'settings'];

export default angular
  .module('resources.accounts', [
    'ngStorage',
    'ngCordovaMocks',
    settingsModule.name
  ])
  .factory('Accounts', Accounts);
