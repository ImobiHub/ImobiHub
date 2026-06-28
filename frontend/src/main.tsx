import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Se o arquivo index.css não existe, comente a linha abaixo com //
// import "./index.css"; 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);