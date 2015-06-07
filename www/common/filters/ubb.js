import 'patorjk/Extendible-BBCode-Parser/xbbcode';
import 'patorjk/Extendible-BBCode-Parser/xbbcode.css!';

// TODO 写个 pre-parser 处理 XBBCODE 不支持的一些功能
// 1. [em00] ~ [em91]
// 2. 转化 形如 [quotex][b]以下是引用[i]标签在2015/6/7 14:20:21[/i]的发言：[/b]↵
// 以及 [quotex][b]以下是引用[i]Fastlane在2015/6/7 14:21:37[/i]的发言： [url=/dispbbs.asp?boardid=135&id=4526662#5][color=royalblue]>>查看原帖<<[/color][/url][/b]↵ 的引用文字

// XBBCODE 已经实现的 ubb 标签：
// [b, bbcode, center, code, color, email, face, font, i,
// img, justify, large, left, li, list, noparse, ol, php,
// quote, right, s, size, small, sub, sup, table, tbody,
// tfoot, thead, td, th, tr, u, ul, url, *]
//
// 尚未实现的：
// [quotex √, align, del, upload, replyview, mp3, audio, video, float, pm, topic, board, noubb]
//
// 实现效果需要纠正的：
// [url, img]
//
// 不打算支持的：
// [glow, shadow, flv, flash, durl]
//
// 参考资料：
// https://github.com/patorjk/Extendible-BBCode-Parser/blob/master/xbbcode.js
// http://www.cc98.org/dispbbs.asp?boardID=198&ID=2914599

ubb.$inject = ['$window'];
function ubb($window) {
  let XBBCODE = $window.XBBCODE;

  XBBCODE.addTags({
    del: {
      openTag: function() {
        return '<del>';
      },
      closeTag: function() {
        return '</del>';
      }
    },
    quotex: {
        openTag: function() {
          return '<blockquote class="xbbcode-blockquote">';
        },
        closeTag: function() {
          return '</blockquote>';
        }
    }
  });

  function parse(ubbCode) {
    let res = XBBCODE.process({
      text: ubbCode,
      addInLineBreaks: true
    });
    let html = res.html.replace(/\n/ig, '<br>');

    return html;
  }

  return parse;
}

export default angular
  .module('filters.ubb', [])
  .filter(ubb.name, ubb);
