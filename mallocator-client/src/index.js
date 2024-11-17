import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import { StoreProvider } from './context/store-context';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/theme-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <StoreProvider>
          <AuthProvider>
            <App />
            <ToastContainer />
          </AuthProvider>
        </StoreProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode >
);

