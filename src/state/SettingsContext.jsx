import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { loadSettings, saveSettings } from '../lib/storage.js';
import { settingsReducer } from './settingsReducer.js';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, dispatch] = useReducer(settingsReducer, null, loadSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const value = useMemo(() => ({ settings, dispatch }), [settings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('useSettings must be used inside SettingsProvider');
  return value;
}
