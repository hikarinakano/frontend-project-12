const apiPath = '/api/v1';

const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
};

const PAGES = {
  CHAT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  NOT_FOUND: '*',

  getChat() {
    return this.CHAT;
  },
  getLogin() {
    return this.LOGIN;
  },
  getSignup() {
    return this.SIGNUP;
  },
  getNotFound() {
    return this.NOT_FOUND;
  }
};

export { apiRoutes, PAGES };
