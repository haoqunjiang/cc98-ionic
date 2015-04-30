import BoardsTemplate from './boards.html!text';

export default {
  url: '/boards',
  views: {
    'tab-boards': {
      template: BoardsTemplate
    }
  }
};
