import TopicsTemplate from './topics.html!text';

export let topicsRoute = {
  url: '/topics',
  views: {
    'tab-topics': {
      template: TopicsTemplate
    }
  },
  data: {
    requiresLogin: true
  }
};
