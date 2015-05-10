import HotController from './hot.controller';
import HotTemplate from './hot.html!text';

export default {
  url: '/hot',
  views: {
    'tab-hot': {
      template: HotTemplate,
      controller: HotController
    }
  }
};
