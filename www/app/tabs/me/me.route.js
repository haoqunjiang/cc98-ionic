import MeTemplate from './me.html!text';

export let meRoute = {
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
