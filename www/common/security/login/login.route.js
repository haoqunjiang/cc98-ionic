import LoginController from './login';
import LoginTemplate from './login.html!text';

export default {
  cache: false,
  url: '/login',
  template: LoginTemplate,
  controller: LoginController
};
