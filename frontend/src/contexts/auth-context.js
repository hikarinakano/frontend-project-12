/* eslint-disable no-unused-vars */
import React from 'react';

const AuthContext = React.createContext({
  loggedIn: false,
  logIn: (_authData) => {},
  logOut: () => {},
});

export default AuthContext;
