const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
};
