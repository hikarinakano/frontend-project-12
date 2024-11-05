// import React from "react";
// import axios from 'axios';
// // import routes from '../routes.js';
// // const getAuthHeader = () => {
// //   const userId = JSON.parse(localStorage.getItem('userId') ?? '{}');
// //   if (userId && userId.token) {
// //     return { Authorization: `Bearer ${userId.token}` };
// //   }

// //   return {};
// // };

const PrivatePage =  () => {
  // const fetchContent = async () => {
    // const channels = await axios.get(routes.channelsPath(), {headers: getAuthHeader()});
    // const messages = await axios.post(routes.messagesPath(), {message: 'hello'}, {headers: getAuthHeader()});
    // the question of connecting channels and messages is still open how. The structure of the slices and the server responses will be different
  // }
  // fetchContent();
  // useEffect(() => {
  //   const fetchContent = async () => {
  //     console.log(getAuthHeader())
  //     await axios.post(routes.loginPath(), { headers: getAuthHeader() });
  //   };

  //   fetchContent();
  // }, []);
  return <div>Congrats you are logged in!</div>
  // END
};

export default PrivatePage;
