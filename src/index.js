import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  //严格模式
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//离线服务
serviceWorker.unregister();
