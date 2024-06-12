import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ContextAPI from './utils/ContextAPI.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextAPI>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextAPI>
);
