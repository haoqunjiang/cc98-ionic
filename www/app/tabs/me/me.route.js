import MeTemplate from './me.html!text';

export default {
  url: '/me',
  views: {
    'tab-me': {
      template: MeTemplate
    }
  },
  data: {
    requiresLogin: true
  }
};
