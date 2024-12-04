const getPath = (key) => {
  const paths = {
    main: '/',
    login: '/login',
    signup: '/signup',
    notFound: '*',
  };

  return paths[key] || paths.notFound;
};

export default getPath;
