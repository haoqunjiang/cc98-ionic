import HotTemplate from './hot.html!text';

export default {
  url: '/hot',
  views: {
    'tab-hot': {
      template: HotTemplate
    }
  }
};
