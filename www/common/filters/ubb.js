import 'patorjk/Extendible-BBCode-Parser/xbbcode';
import 'patorjk/Extendible-BBCode-Parser/xbbcode.css!';

import settingsModule from '../resources/settings';

// XBBCODE 已经实现的 ubb 标签：
// [b, bbcode, center, code, color, email, face, font, i,
// img, justify, large, left, li, list, noparse, ol, php,
// quote, right, s, size, small, sub, sup, table, tbody,
// tfoot, thead, td, th, tr, u, ul, url, *]
//
// 尚未实现的：
// [quotex√, del√, noubb √, align √, float √, upload √, mp3 √, audio √, video, replyview, pm, topic, board]
//
// 实现效果需要纠正的：
// [size √, color √, font √, url, img √]
//
// 不打算支持的：
// [glow, shadow, flv, flash, durl]
//
// 参考资料：
// https://github.com/patorjk/Extendible-BBCode-Parser/blob/master/xbbcode.js
// http://www.cc98.org/dispbbs.asp?boardID=198&ID=2914599

ubb.$inject = ['$window', '$sce', 'settings'];
function ubb($window, $sce, settings) {
  let XBBCODE = $window.XBBCODE;

  // 下载文件用到的方法，用到了 InAppBrowser
  // 因为 Safari Mobile 并不支持 download 属性所以才用这个方法绕过
  $window.openLink = function(link) {
    window.open(link, '_system');
  };

  // 显示图片
  // 用 directive 做太麻烦了，直接绑定比较省事
  $window.showImage = function(ele) {
    ele.src = ele.dataset.src;
  };

  // 自定义 ubb 标签
  XBBCODE.addTags({
    // 无参数的标签
    del: {
      openTag: () => '<del>',
      closeTag: () => '</del>'
    },
    img: {
      openTag: (params, content) =>
        `<img src="/img/click-to-show.png" data-src="${content}" onclick="showImage(this)">`,
      closeTag: () => ''
    },
    mp3: {
      displayContent: false,
      openTag: (params, content) => `<audio src="${content}" controls="1" preload="none">`,
      closeTag: () => `</audio>`
    },
    noubb: {
      openTag: () => '<span class="noubb">',
      closeTag: () => '</span>'
    },
    quotex: {
        openTag: () => '<blockquote class="xbbcode-blockquote">',
        closeTag: () => '</blockquote>'
    },

    // 带参数的标签
    align: {
      openTag: (params) => {
        let match = params.match(/^=(left|right|center)$/i);  // 不能带 g flag
        if (match) {
          return `<div class="xbbcode-${match[1]}">`;
        } else {
          return '<div>';
        }
      },
      closeTag: () => '</div>'
    },
    audio: {
      displayContent: false,
      // 暂时懒得处理参数
      openTag: (params, content) => `<audio src="${content}" controls="1" preload="none">`,
      closeTag: () => `</audio>`
    },
    color: {
      openTag: (params) => {
        let colorName = params.substr(1).toLowerCase() || 'black';
        return `<span style="color:${colorName}">`;
      },
      closeTag: () => '</span>'
    },
    float: {
      openTag: (params) => {
        let match = params.match(/^=(left|right)$/ig);
        if (match) {
          return `<br style="clear:both"><span style="float: ${match[1]}">`;
        } else {
          return '<span>';
        }
      },
      closeTag: () => '</span>'
    },
    font: {
      openTag: (params) => {
        var fontface = `'${params.substr(1)}'` || 'inherit';
        return `<span style="font-family: ${fontface}">`;
      },
      closeTag: () => '</span>'
    },
    size: {
      openTag: (params) => {
        let size = params.substr(1);

        // 自带单位的就直接赋值给 style
        if (/^\d+(px|pt|em|rem|vh|vw|vmin|vmax)$/.test(size)) {
          return `<span style="font-size: ${size}"></span>`;
        }

        // 否则按 size x 5px 算字号
        size = parseInt(size, 10);

        if (size < 0) {
          size = 16 / 5;  // 默认字号 16px
        } else if (size > 7) {
          size = 7; // 最大字号 35px
        }

        return `<span class="xbbcode-size-${(size * 5)}">`;
      },
      closeTag: () =>'<span'
    },
    upload: {
      displayContent: false,
      openTag: (params, content) => {
        params = params.substr(1).split(',');

        let ext = params[0];
        let clickToShow = (params[1] === '1');
        let imageUrlToShow = clickToShow ? '/img/click-to-show.png' : content;

        // test if it is img
        if (/^(gif|jpg|jpeg|bmp|png)$/.test(ext)) {
          return `<img src="${imageUrlToShow}" data-src="${content}" onclick="showImage(this)">`;
        }

        // otherwise, file
        return `<a href="javascript:void(0)" onclick="openLink(${content})"></a>`;
      },
      closeTag: () => ''  // 反正 content 不显示，逻辑都放在 openTag 里做比较简单
    },
    url: {
      openTag: (params, content) => {
        let url = params.substr(1);

        // 没有参数则直接用链接文字作为链接
        if (!url) { url = content; }

        // 阻止脚本。
        if (url.match(/^\s*javascript\s*:/gi)) {
          return '<a>';
        }

        // 格式化地址，如果是站内链接的话转化为 app 内链

        // 否则直接用 url（链接文字为空时直接用 url 参数作为文字）
        return `<a href="${url}" target="_blank">${content ? '' : url}`;
      },
      closeTag: () => '</a>'
    }
  });

  // 解析 ubb 代码
  function parse(ubbCode) {
    let res = XBBCODE.process({
      text: ubbCode.trim(),
      addInLineBreaks: false
    });

    // 处理换行
    let html = res.html.replace(/\n/ig, '<br>');

    // 处理表情（先统一转换成 img 标签，再通过 css 设置 noubb、code 标签下的显示内容）
    html = html.replace(/(?:\[|(?:&#91;))em([0-9]{2})(?:\]|(?:&#93;))/ig,
      `<img class="cc98-emot cc98-emot-$1" src="${settings.websiteHost}emot/emot$1.gif" border="0">`);

    return html;
  }

  return parse;
}

export default angular
  .module('filters.ubb', [settingsModule.name])
  .filter(ubb.name, ubb);
