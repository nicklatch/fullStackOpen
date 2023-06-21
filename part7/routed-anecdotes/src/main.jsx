import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContextProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationContextProvider>
      <Router>
        <App />
      </Router>
    </NotificationContextProvider>
  </React.StrictMode>
);
