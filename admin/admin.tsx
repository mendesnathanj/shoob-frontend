import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
import Admin from '../src/entries/Admin';

ReactDOM
  .createRoot(document.getElementById('admin') as HTMLDivElement)
  .render(
    <React.StrictMode>
      <Admin />
    </React.StrictMode>
  );
