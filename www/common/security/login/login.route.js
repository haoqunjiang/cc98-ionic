import LoginTemplate from './login.html!text';
import LoginController from './login.controller';

export default {
  cache: false,
  url: '/login',
  template: LoginTemplate,
  controller: LoginController
};
