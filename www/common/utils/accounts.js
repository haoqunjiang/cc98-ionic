import 'ionic';

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

export default angular.module('utils.accounts', []).factory(Accounts);
