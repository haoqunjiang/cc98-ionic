import CommentController from './comment.controller';
import CommentTemplate from './comment.html!text';

export let commentRoute = {
  url: '/comment/:topicId/:replyId',
  template: CommentTemplate,
  controller: CommentController,
  params: {
    quoteText: ''
  }
};
