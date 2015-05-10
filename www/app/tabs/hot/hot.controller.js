class HotController {
  constructor($scope, APIRequest) {
    $scope.ctrl = this;

    this.$scope = $scope;
    this.APIRequest = APIRequest;

    this.APIRequest.get('topic/hot').then((data) => this.topics = data);
  }
}

HotController.$inject = ['$scope', 'APIRequest'];

export default HotController;
