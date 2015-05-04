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

  return services;
}

Accounts.$inject = [];

export default angular.module('resources.accounts', []).factory(Accounts);
