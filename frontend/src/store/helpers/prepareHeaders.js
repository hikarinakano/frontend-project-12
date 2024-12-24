const prepareHeaders =  (headers, { getState }) => {
  const { token } = getState().auth;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export default prepareHeaders;
