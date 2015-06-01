class TopicController {
  constructor($scope, $stateParams, APIRequest) {
    $scope.ctrl = this;

    this.APIRequest = APIRequest;
    this.topicId = $stateParams.topicId;
    this.boardId = $stateParams.boardId;
    this.boardName = $stateParams.boardName;

    this.fetchPosts(0, 9)
      .then((list) => {
        this.title = list[0].title;
        this.posts = list;
      });
  }

  fetchPosts(from, to) {
    return this.APIRequest.get(`post/topic/${this.topicId}`, {
      headers: {Range: `bytes=${from}-${to}`}
    });
  }
}

TopicController.$inject = ['$scope', '$stateParams', 'APIRequest'];
