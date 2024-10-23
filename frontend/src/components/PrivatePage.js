// @ts-check

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId') ?? '{}');

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  // BEGIN (write your solution here)
  const [content, setContent] = useState('');
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.post(routes.loginPath(), { headers: getAuthHeader() });
      console.log(data)
      setContent(data);
    };

    fetchContent();
  }, []);

  return <div>Congrats you're logged in!</div>
  // END
};

export default PrivatePage;
