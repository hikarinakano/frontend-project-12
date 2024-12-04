import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const run = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const app = await init(socket);
  root.render(<React.StrictMode>{app}</React.StrictMode>);
};

run();
