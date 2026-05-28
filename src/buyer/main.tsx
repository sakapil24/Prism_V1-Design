import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

// Import CSS globals (loads Tailwind v4 and Prism Design Tokens)
import '../design-system/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
