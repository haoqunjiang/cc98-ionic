class HotController {
  constructor($scope) {
    $scope.ctrl = this;
    this.$scope = $scope;
  }
}

HotController.$inject = ['$scope'];

export default HotController;
