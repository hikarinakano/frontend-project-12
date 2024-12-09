import getPath from './getPath';

const getRoutes = () => [
  {
    key: 'chat',
    path: getPath('chat'),
    component: 'ChatPage',
    private: true,
  },
  {
    key: 'login',
    path: getPath('login'),
    component: 'LoginPage',
  },
  {
    key: 'signup',
    path: getPath('signup'),
    component: 'SignupPage',
  },
  {
    key: 'notFound',
    path: getPath('notFound'),
    component: 'NotFoundPage',
  },
];

export default getRoutes;
