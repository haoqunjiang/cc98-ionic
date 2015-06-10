class TopicController {
  static get $inject() { return ['$scope', '$stateParams', 'APIRequest', 'Users', 'settings']; }

  constructor($scope, $stateParams, APIRequest, Users, settings) {
    // controller as
    $scope.ctrl = this;

    // dependencies
    this.$scope = $scope;
    this.APIRequest = APIRequest;
    this.Users = Users;
    this.settings = settings;

    // meta
    // 不论以何种方式进入当前主题，以下两个参数都应当存在
    this.topicId = $stateParams.topicId;
    this.boardId = $stateParams.boardId;
    this.page = $stateParams.page;  // 这个是因为有默认值
    // 以下参数则不一定有传过来
    this.topicTitle = $stateParams.topicTitle;
    this.boardName = $stateParams.boardName;
    this.postsCount = $stateParams.postsCount;

    this.fetchMeta();
    this.fetchPosts().then(() => this.fetchAvatars(false)); // 载入页面不必刷新头像缓存
  }

  // 下一页
  nextPage() {
    if (!this.postsCount || this.page * 10 >= this.postsCount) {
      return;
    }

    this.page += 1;
    this.fetchPosts().then(() => this.fetchAvatars(false));
  }

  // 上一页
  prevPage() {
    if (this.page === 1) {
      return;
    }

    this.page += 1;
    this.fetchPosts().then(() => this.fetchAvatars(false));
  }

  // 显示跳页对话框
  showJumpDialog() {}

  gotoPage() {}

  // 刷新页面并强制刷新头像缓存
  refreshPage() {
    Promise.all([
      this.fetchMeta(),
      this.fetchPosts().then(() => this.fetchAvatars())
    ]).then(() => this.$scope.$broadcast('scroll.refreshComplete'));
  }

  fetchMeta() {
    return this.APIRequest
      .get(`topic/${this.topicId}`)
      .then((topicMeta) => {
        Object.assign(this, topicMeta);

        // 一些属性在 API 中的名字与此处实现的名字不同
        this.topicTitle = topicMeta.title;
        this.postsCount = topicMeta.replyCount + 1;

        // 然后获取版面的基本信息
        return this.APIRequest.get(`board/${this.boardId}`);
      })
      .then((boardMeta) => this.boardName = boardMeta.name);
  }

  fetchPosts() {
    let from = (this.page - 1) * 10;
    let to = this.page * 10 - 1;

    return this.APIRequest
      .get(`post/topic/${this.topicId}`, {
        headers: {Range: `bytes=${from}-${to}`}
      })
      .then((list) => {
        this.title = list[0].title;
        this.posts = list;
      });
  }

  fetchAvatars(reload=true) {
    this.posts.map((item) => {
      // 心灵
      if (!item.userId) {
        item.userAvatar = '/img/anonymous.gif';
        return;
      }
      // 否则载入用户头像
      this.Users.query({userId: item.userId, fromRemote: reload})
        .then(({portraitUrl}) => {
          item.userAvatar = portraitUrl.startsWith('http') ? portraitUrl : (this.settings.websiteHost + portraitUrl);
        });
    });
  }
}

export default TopicController;
