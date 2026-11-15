import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { SettingsProvider } from './state/SettingsContext.jsx';
import { ToastProvider } from './state/ToastContext.jsx';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/fields.css';
import './styles/panels.css';
import './styles/preview.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </SettingsProvider>
  </StrictMode>
);
