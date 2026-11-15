import { normalizeSettings } from '../core/settings.js';

const KEY = 'printscii.settings.v1';

export function loadSettings() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return normalizeSettings(raw ? JSON.parse(raw) : null);
  } catch (error) {
    return normalizeSettings(null);
  }
}

export function saveSettings(settings) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    return false;
  }
}
