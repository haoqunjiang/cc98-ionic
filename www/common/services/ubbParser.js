import 'patorjk/Extendible-BBCode-Parser/xbbcode';
import 'patorjk/Extendible-BBCode-Parser/xbbcode.css!';

ubbParser.$inject = ['$window'];
function ubbParser($window) {
  let XBBCODE = $window.XBBCODE;

  let services = {
    parse: XBBCODE.process.bind(XBBCODE)
  };
  return services;
}

export default angular
  .module('services.ubbParser', [])
  .factory(ubbParser.name, ubbParser);
