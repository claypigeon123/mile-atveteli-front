import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './Main.js';
import { positions, Provider, transitions } from 'react-alert';
import { InfoIcon, SuccessIcon, ErrorIcon, CloseIcon } from './img/Icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/body.css';
import "react-toggle/style.css"

const alertOptions = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER,
    transition: transitions.SCALE
};

const alertStyle = {
    backgroundColor: '#151515',
    color: 'white',
    padding: '18px 10px 18px 10px',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '2px 2px 5px 3px rgba(0, 0, 0, 0.4)',
    width: '400px',
    boxSizing: 'border-box'
}

const buttonStyle = {
    marginLeft: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#FFFFFF'
}

const template = ({style, options, message, close}) => (
    <div style={{ ...alertStyle, ...style }}>
        {options.type === 'info' && <InfoIcon />}
        {options.type === 'success' && <SuccessIcon />}
        {options.type === 'error' && <ErrorIcon />}
        <span style={{ flex: 2, fontSize: 18 }}>{message}</span>
        <button onClick={close} style={buttonStyle}>
        <CloseIcon />
        </button>
    </div>
)

const AppContainer = () => (
    <Provider template={template} {...alertOptions}>
        <Main />
    </Provider>
);

ReactDOM.render(
    <React.StrictMode>
        <AppContainer />
    </React.StrictMode>,
    document.getElementById('root')
);