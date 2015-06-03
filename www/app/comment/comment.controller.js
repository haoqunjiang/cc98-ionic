class CommentController {
  static get $inject() { return ['$scope']; }

  constructor($scope) {
    $scope.ctrl = this;

    this.$scope = $scope;
  }
}

export default CommentController;
