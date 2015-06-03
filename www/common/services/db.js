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

  // upsert 方法（在 import 'pouchdb/upsert' 时碰到了一些问题，所以干脆自己实现一遍了，此处接口并不与官方的 upsert 插件相同）
  db.upsert = function(doc) {
    // 先进行一遍查询
    return db.get(doc._id)
      .then(({_rev}) => {
        // 如果有查询到，就赋值 _rev 然后再插入
        let newDoc = Object.assign({}, doc, {_rev: _rev});
        db.put(newDoc);
      })
      .catch(err => {
        if (err.status === 404) {
          return db.put(doc); // 如果没查询到就直接插入
        } else {
          throw err;  // 否则抛出异常
        }
      });
  };

  return db;
}

export default angular
  .module('services.db', ['pouchdb'])
  .factory('usersdb', usersdb);
