import { normalizeSettings } from '../core/settings.js';
import { applyCharset, applyPreset } from '../core/presets.js';

export function settingsReducer(state, action) {
  switch (action.type) {
    case 'set':
      return { ...state, [action.key]: action.value };
    case 'preset':
      return applyPreset(state, action.name);
    case 'charset':
      return applyCharset(state, action.value);
    case 'reset':
      return normalizeSettings(null);
    default:
      return state;
  }
}
