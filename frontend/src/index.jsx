import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import './index.css';
import App from './App';

import io from "socket.io-client";

// create a new connection to the socket
const socket = io.connect(window.location.origin)

socket.on('error', (error) => {
  console.error(error);
});

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socket={socket}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
