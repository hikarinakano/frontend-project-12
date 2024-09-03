const apiPath = '/api/v2';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
};
