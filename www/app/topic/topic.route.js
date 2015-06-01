import TopicController from './topic.controller';
import TopicTemplate from './topic.html!text';

export default {
  url: '/topic/:topicId?boardId&boardName',
  template: TopicTemplate,
  controller: TopicController
};
