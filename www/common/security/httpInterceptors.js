/**
 * 返回状态：
 * OK 200 无 操作成功完成，并返回了所有数据。
 * NoContent 204 无 操作成功完成，但未返回任何数据。
 * PartialContent  206 无 操作成功完成，但只返回了部分数据。
 * BadRequest  400 paging_info_invalid 请求中提供的分页信息不符合要求。
 * BadRequest 400 paging_info_required  请求中未提供必需的分页信息。
 * RequestedRangeNotSatisfiable 416 无 分页信息指示的数据量超过了请求该操作允许的上限。
 * RequestedRangeNotSatisfiable  416 无 请求的主题数目超过了一次请求的最大限制。
 *
 * GET Topic/Board/{boardId}
 * Unauthorized 401 无 对应的板面有权限设置，且当前用户未登录。
 * Forbidden 403 无 但当前用户无权访问对应的版面。
 * RequestedRangeNotSatisfiable  416 无 分页信息指示的数据量超过了请求该操作允许的上限。
 * RequestedRangeNotSatisfiable  416 无 请求的主题数目超过了一次请求的最大限制。

 * GET Topic/{id}
 * Unauthorized 401 无 主题所在的版面需要登录或验证用户身份。
 * Forbidden 403 无 主题所在的版面是加密或隐藏版面，当前用户无权访问该版面。
 * NotFound  404 无 给定 ID 对应的主题不存在。
 * Gone  410 无 该主题已经被删除。
 *
 * POST Topic/Board/{boardId}
 * BadRequest 400 content_is_empty  发言内容为空。
 * BadRequest  400 invalid_boardid 版面 ID 对应的版面不存在。
 * BadRequest  400 invalid_data  一个或多个必须的参数不符合要求。
 * BadRequest  400 title_is_empty  发言标题为空。
 * Unauthorized  401 无 当前用户未登录，或未授权客户端必要的领域。
 * Forbidden 403 board_iscategory  版面是分类版面，不允许创建主题。
 * Forbidden 403 board_islocked  版面当前被锁定，不允许创建主题。
 * RequestEntityTooLarge 413 content_too_long  发言内容超过系统设置的长度上限。
 * RequestEntityTooLarge 413 title_too_long  发言标题超过系统设置的长度上限。
 *
 * POST Post/Topic/{topicId}
 * BadRequest 400 invalid_topicid topicId 对应的主题不存在或已经被删除。
 * BadRequest  400 topic_islocked  主题被锁定，无法进行回复。
 * Unauthorized  401 无 当前用户未登录，或未授权客户端必要的领域。
 *
 * GET Post/{id}
 * Unauthorized 401 无 该发言对应的主题具体有权限要求，而当前用户未登录。
 * Forbidden 403 无 当前用户无权浏览该发言对应的主题。
 * NotFound  404 无 id 对应的发言不存在。
 *
 * PUT Post/{id}
 * NoContent  204 无 操作成功完成。
 * BadRequest 400 invalid_id  id 指定的帖子发言存在或已经被删除。
 * Unauthorized  401 无 当前用户未登录，或未授权客户端必要的领域。
 * Forbidden 403 无 当前用户不是发言作者，不能修改发言。
 *
 * GET User/Name/{name}
 * GET User/{id}
 * NotFound 404 无 给定用户名对应的用户不存在。
 *
 * GET Board/{boardId}/Subs
 * BadRequest 400 invalid_boardId boarId 对应的版面不存在。
 *
 * GET Board/{id}
 * Forbidden  403 无 版面是隐藏面板，当前用户未登录或不具有访问权限。
 * NotFound 404 无 给定 ID 对应的板面不存在。
 *
 * GET Board?id[0]={id[0]}&id[1]={id[1]}
 * PaymentRequired  402 无 版面 ID 列表为空。
 * Forbidden 403 无 至少一个版面是隐藏面板，且当前用户未登录或不具有访问权限。
 * NotFound  404 无 至少一个给定 ID 对应的板面不存在。
 * RequestEntityTooLarge 413 无 数组的长度过大。
 *
 * GET Me/Basic
 * GET Me/CustomBoards
 * GET Me
 * Unauthorized 401 无 当前用户未登录，或未授权客户端必要的领域。
 *
 * PUT Me
 * NoContent  204 无 操作成功完成。
 * Unauthorized 401 无 当前用户未登录，或未授权客户端必要的领域。
 *
 * GET Message/{id}
 * Unauthorized 401 无 当前用户未登录，或未授权客户端必要的领域。
 * Forbidden 403 无 当前用户不是该消息的发送者或者接收者。
 * NotFound  404 无 给定 id 对应的消息不存在。
 * Gone  410 无 该短消息已经被当前用户删除。
 *
 * GET Message?userName={userName}&filter={filter}
 * BadRequest 400 invalid_filter_type filter 参数不是有效的枚举值。
 * BadRequest  400 paging_info_invalid 请求中提供的分页信息不符合要求。
 * BadRequest  400 paging_info_required  请求中未提供必需的分页信息。
 * Unauthorized  401 无 当前用户未登录，或未授权客户端必要的领域。
 * RequestedRangeNotSatisfiable  416 无 分页信息指示的数据量超过了请求该操作允许的上限。
 *
 * DELETE Message/{id}
 * PUT Message/{id}
 * NoContent  204 无 操作成功完成。
 *
 * POST Message
 * BadRequest 400 invalid_data  一个或多个字段内容不符合要求
 * BadRequest  400 receiverName_invalid  收件人所对应的用户不存在
 * Unauthorized  401 无 当前用户未登录，或未授权客户端必要的领域。
 * RequestEntityTooLarge 413 content_too_long  内容长度超过了允许的字符数上限
 * RequestEntityTooLarge 413 title_too_long  标题长度超过了允许的字符数上限
 */
import 'ionic';
import 'gsklee/ngStorage';

import settingsModule from '../resources/settings';

import ErrorCode from '../error-code';

function authInterceptor($q, $localStorage, settings) {
  return {
    request: function(config) {
      // 如果不是 API 调用的话跳过验证
      if (!config.url.startsWith(settings.apiEndpoint)) {
        return config;
      }

      let current = $localStorage.current;

      // 未登录时直接返回
      if (!current || !current.access_token) {
        return config;
      }

      if (Date.now() < current.access_token_expiry) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + current.access_token;
        return config;
      } else if (Date.now() < current.refresh_token_expiry) {
        return $q.reject(ErrorCode.ACCESS_TOKEN_EXPIRED);
      } else {
        return $q.reject(ErrorCode.REFRESH_TOKEN_EXPIRED);  // 这个逻辑放在这里不是很合适，以后移到 retry 部分
      }
    },

    response: function(response) {
      return response;
    }
  };
}

authInterceptor.$inject = ['$q', '$localStorage', 'settings'];

export default angular.module('security.httpInterceptors', [
  'ngStorage',
  settingsModule.name
]).factory('authInterceptor', authInterceptor)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

