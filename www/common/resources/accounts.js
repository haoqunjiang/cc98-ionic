import 'ionic';
import 'gsklee/ngStorage';

function Accounts() {
  var services = {
    get: get,
    set: set,
    update: update,

    all: all,

    getCurrent: getCurrent,
    setCurrent: setCurrent
  };

  function get() {}
  function set() {}
  function update() {}
  function all() {}
  function getCurrent() {}
  function setCurrent() {}

  return services;
}

Accounts.$inject = [];

export default angular.module('resources.accounts', []).factory('Accounts', Accounts);
