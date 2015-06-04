import HotController from './hot.controller';
import HotTemplate from './hot.html!text';

export let hotRoute = {
  url: '/hot',
  views: {
    'tab-hot': {
      template: HotTemplate,
      controller: HotController
    }
  }
};
