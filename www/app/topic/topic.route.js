import TopicController from './topic.controller';
import TopicTemplate from './topic.html!text';

export let topicRoute = {
  url: '/topic/:topicId',
  template: TopicTemplate,
  controller: TopicController,
  params: {
    topicTitle: '',
    boardId: null,
    boardName: '',
    page: 1,
    postsCount: 1
  }
};
