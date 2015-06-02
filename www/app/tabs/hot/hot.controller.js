class HotController {
  constructor($scope, APIRequest) {
    $scope.ctrl = this;

    this.$scope = $scope;
    this.APIRequest = APIRequest;

    this.fetch();
  }

  fetch() {
    this.APIRequest.get('topic/hot')
      .then((data) => this.topics = data)
      .then(() => this.$scope.$broadcast('scroll.refreshComplete'));
  }
}

HotController.$inject = ['$scope', 'APIRequest'];

export default HotController;
