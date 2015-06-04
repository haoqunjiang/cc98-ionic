import 'ionic';
import moment from 'moment';
import 'moment/locale/zh-cn'; // this is ugly, should find a better way to import locale

// 参考了豆瓣小组的时间显示，在不产生歧义的情况下返回最 human-readable 的时间格式
function fromNow(str) {
  let date = moment(str);
  let now = moment();

  moment.locale('zh-cn');

  if (now.diff(date, 'days') < 1) {
    return date.fromNow();  // 一天以内的，返回 fromNow
  } else if(now.diff(date, 'years') < 1) {
    return date.format('MM-DD HH:mm'); // 一年以内的，返回 月-日-时-分
  } else {
    return date.format('YYYY-MM-DD'); // 不是同一年的，返回 年-月-日
  }
}

export default angular
  .module('filters.fromNow', [])
  .filter(fromNow.name, () => fromNow);
