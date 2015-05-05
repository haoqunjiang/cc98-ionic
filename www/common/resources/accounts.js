import 'ionic';
import 'gsklee/ngStorage';

function Accounts() {
  var current;

  var services = {
    get: get,
    set: set,
    update: update,

    all: all,

    getCurrent: getCurrent,
    setCurrent: setCurrent
  };

  return services;

  function get() {}
  function set() {}
  function update() {}
  function all() {}

  function getCurrent() {
    return current;
  }

  function setCurrent(user) {
    current = user;
  }
}

Accounts.$inject = [];

export default angular.module('resources.accounts', []).factory('Accounts', Accounts);
