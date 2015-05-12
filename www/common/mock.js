import 'ionic';
import 'angular-mocks';

/* eslint-disable quotes,quote-props */
export default angular.module('mock', ['ngMockE2E'])
  .run(function($httpBackend) {
    $httpBackend.whenGET(/^.*/).passThrough();
    $httpBackend.whenPOST(/^.*/).passThrough();
  });
