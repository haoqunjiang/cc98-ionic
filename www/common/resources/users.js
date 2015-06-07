import dbModule from '../services/db';
import apiModule from '../services/api';

Users.$inject = ['$q', 'APIRequest', 'usersdb'];
function Users($q, APIRequest, usersdb) {
  let services = {
    query: query
  };

  return services;

  /**
   * 查询用户详情（带本地缓存）
   * @param  {number}  [options.userId] 用户 ID
   * @param  {string}  [options.userName] 用户名，userId 和 userName 不能同时为空
   * @param  {boolean} [options.fromRemote=false] 强制从服务器端取数据
   * @return {Promise}
   */
  function query({userId, userName, fromRemote=false}) {
    if (!userId && !userName) {
      throw new Error('用户名和用户 ID 不能同时为空！');
    }

    if (userId) {
      let dbPromise = fromRemote ? $q.reject() : usersdb.get(userId.toString());
      return dbPromise.catch(() => queryRemote({userId}));
    }

    if (userName) {
      let dbPromise = fromRemote ? $q.reject() : usersdb.query('byUserName', {key: userName});
      return dbPromise.catch(() => queryRemote({userName}));
    }
  }

  /**
   * 从服务端查询用户详情
   * @param  {number} [options.userId] 用户 ID
   * @param  {string} [options.userName] 用户名，userId 和 userName 不能同时为空
   * @return {Promise}
   */
  function queryRemote({userId, userName}) {
    if (userId) {
      return APIRequest.get(`user/${userId}`).then(cache);
    } else {
      return APIRequest.get(`user/name/${userName}`).then(cache);
    }
  }

  /* eslint-disable camelcase, no-console */
  /**
   * 缓存查询到的用户对象到本地数据库中
   * @param  {Object} user
   * @return {Promise}
   */
  function cache(user) {
    Object.assign(user, {_id: user.id.toString(), pouchdb_updated: Date.now()});

    return usersdb.upsert(user)
      .then((inserted) => inserted)
      .catch((err) => {
        console.error(err);
      });
  }
  /* eslint-enable camelcase, no-console */
}

export default angular
  .module('resources.users', [
    dbModule.name,
    apiModule.name
  ])
  .factory(Users.name, Users);
