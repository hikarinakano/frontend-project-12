const apiPath = '/api/v1';

const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
};

const pageRoutes = () => [
  {
    key: 'chat',
    path: '/',
    component: 'ChatPage',
    private: true,
  },
  {
    key: 'login',
    path: '/login',
    component: 'LoginPage',
  },
  {
    key: 'signup',
    path: '/signup',
    component: 'SignupPage',
  },
  {
    key: 'notFound',
    path: '*',
    component: 'NotFoundPage',
  },
];

export { apiRoutes, pageRoutes };
