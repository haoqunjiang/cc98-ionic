import 'ionic';

import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;

import 'angular-pouchdb/angular-pouchdb';

usersdb.$inject = ['pouchDB'];
function usersdb(pouchDB) {
  let db = pouchDB('users');

  // 用于生成 design document 建立二级索引
  function createDesignDoc(name, mapFunction) {
    let ddoc = {
      _id: '_design/' + name,
      views: {}
    };
    ddoc.views[name] = {map: mapFunction.toString()};
    return ddoc;
  }

  // 建立基于 userName 的索引（基于目前的 app 功能设计应该是用不到的……不过先建一个以防万一）
  let byUserNameDdoc = createDesignDoc('byUserName', (doc, emit) => emit(doc.userName));
  // 如果之前没有这个 design document，就 put 一个进去
  db.get('_design/byUserName').catch(() => db.put(byUserNameDdoc));

  return db;
}

export default angular
  .module('services.db', ['pouchdb'])
  .factory('usersdb', usersdb);
