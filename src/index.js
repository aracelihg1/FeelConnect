import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Manejo global para ignorar el error 'Script error.'
window.onerror = function(message, source, lineno, colno, error) {
  if (message === 'Script error.') {
    // Ignorar el error de script externo
    return true;
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
