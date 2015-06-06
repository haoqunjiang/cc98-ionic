import BoardsTemplate from './boards.html!text';

export let boardsRoute = {
  url: '/boards',
  views: {
    'tab-boards': {
      template: BoardsTemplate
    }
  }
};
