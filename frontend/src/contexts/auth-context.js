import React from 'react';

const AuthContext = React.createContext({
  loggedIn: false,
  logIn: (authData) => {},
  logOut: () => {},
});

export default AuthContext;
