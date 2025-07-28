import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure Tailwind styles are imported
import App from './App'; // Make sure the case matches your actual file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// (Optional): Web Vitals reporting has been removed because reportWebVitals.js does not exist.
