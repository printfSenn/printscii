const PRESETS = Object.freeze({
  low: { charset: 'standard', rampLen: 10 },
  medium: { charset: 'detailed', rampLen: 30 },
  high: { charset: 'detailed', rampLen: 70 },
  ultra: { charset: 'detailed', rampLen: 70, edges: true, edgeStrength: 60, sharpness: 40 }
});

export function applyPreset(settings, name) {
  const preset = PRESETS[name];
  if (!preset) return settings;
  const leavingUltra =
    settings.preset === 'ultra' && name !== 'ultra' ? { edges: false, sharpness: 0 } : {};
  return { ...settings, ...leavingUltra, ...preset, preset: name };
}

export function applyCharset(settings, charset) {
  if (charset === 'standard') return { ...settings, charset, preset: 'low', rampLen: 10 };
  if (charset === 'detailed') return { ...settings, charset, preset: 'high', rampLen: 70 };
  return { ...settings, charset, preset: '' };
}
