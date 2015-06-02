class TopicController {
  constructor($scope, $stateParams, APIRequest) {
    $scope.ctrl = this; // controller as

    // dependencies
    this.$scope = $scope;
    this.APIRequest = APIRequest;

    // meta
    this.topicId = $stateParams.topicId;
    this.topicTitle = $stateParams.topicTitle;
    this.boardId = $stateParams.boardId;
    this.boardName = $stateParams.boardName;

    this.page = 1;

    // fetch the first page
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

export default TopicController;
