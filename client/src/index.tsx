import React from 'react';
import path from 'path';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import './index.css';
import App from './App';

dotenv.config({ path: path.resolve('..', '..', '.env') });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
