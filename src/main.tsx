import React from 'react';
import ReactDOM from 'react-dom/client';
import Customer from './entries/Customer';
import './index.css';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <React.StrictMode>
      <Customer />
    </React.StrictMode>
  );
