import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
// 18버전 react라서 ReactDOM.render 지원안함.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
