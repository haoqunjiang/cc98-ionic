import 'ionic';
import 'ngStorage';

function Accounts($localStorage) {
  let services = {
    get: get,
    set: set,

    all: all,

    getCurrent: getCurrent,
    setCurrent: setCurrent
  };
  return services;


  /**
   * get a stored account by username or userid
   * (if both provided, the username has higher priority during search)
   * @param  {string} options.username
   * @param  {number} options.userid
   * @return {Object} the found account or null
   */
  function get({username, userid}) {
    return $localStorage.find((x) => x.username === username || x.userid === userid);
  }

  /**
   * append/update a account in the accounts array
   * @param {object} user the user account to set
   */
  function set(user) {
    let found = $localStorage.accounts.find(x => x.username === user.username);
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
   * @param {id}     [user.userid]
   * @param {string} [user.username]
   * @param {string} [user.avatar]
   */
  function setCurrent(user) {
    current = user;
    // 如果有用户名，就 push/update 它到 accounts 数组中
    if (user.username) {
      services.set(user);
    };
  }
}

Accounts.$inject = ['$localStorage'];

export default angular.module('resources.accounts', [
  'ngStorage'
]).factory('Accounts', Accounts);
