import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const AppContainer = () => (
  <Provider template={AlertTemplate} {...alertOptions}>
    <Main />
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
  document.getElementById('root')
);