import TopicController from './topic.controller';
import TopicTemplate from './topic.html!text';

export default {
  url: '/topic/:topicId',
  template: TopicTemplate,
  controller: TopicController,
  params: {
    topicTitle: '',
    boardId: null,
    boardName: ''
  }
};
