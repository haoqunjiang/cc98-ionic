import 'patorjk/Extendible-BBCode-Parser/xbbcode';
import 'patorjk/Extendible-BBCode-Parser/xbbcode.css!';

ubb.$inject = ['$window'];
function ubb($window) {
  let XBBCODE = $window.XBBCODE;

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
