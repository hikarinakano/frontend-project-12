import React from 'react';

const AuthContext = React.createContext({
  loggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default AuthContext;
