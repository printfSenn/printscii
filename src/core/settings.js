import { clamp } from './math.js';

export const CHARSETS = Object.freeze(['standard', 'detailed', 'blocks', 'binary', 'custom']);
export const PRESET_NAMES = Object.freeze(['low', 'medium', 'high', 'ultra']);
export const COLOR_MODES = Object.freeze(['mono', 'color', 'gray']);

export const DEFAULTS = Object.freeze({
  cols: 120,
  preset: 'medium',
  rampLen: 30,
  charset: 'detailed',
  custom: '',
  sharpness: 0,
  edges: false,
  edgeStrength: 60,
  contrast: 0,
  brightness: 0,
  gamma: 1,
  dither: false,
  invert: true,
  colorMode: 'mono',
  fg: '#1c2252',
  bg: '#fafbf4'
});

const RANGES = Object.freeze({
  cols: [40, 400, true],
  rampLen: [2, 70, true],
  sharpness: [0, 100, true],
  edgeStrength: [0, 100, true],
  contrast: [-100, 100, true],
  brightness: [-100, 100, true],
  gamma: [0.2, 3, false]
});

const BOOLEANS = Object.freeze(['edges', 'dither', 'invert']);

const PIPELINE_KEYS = Object.freeze([
  'cols',
  'bg',
  'charset',
  'rampLen',
  'custom',
  'sharpness',
  'edges',
  'edgeStrength',
  'contrast',
  'brightness',
  'gamma',
  'dither',
  'invert'
]);

const HEX = /^#[0-9a-f]{6}$/i;

function isPresent(value) {
  return value !== undefined && value !== null && value !== '';
}

export function normalizeSettings(input) {
  const source = input && typeof input === 'object' ? input : {};
  const out = { ...DEFAULTS };

  for (const [key, [low, high, integer]] of Object.entries(RANGES)) {
    const value = Number(source[key]);
    if (isPresent(source[key]) && Number.isFinite(value)) {
      out[key] = clamp(integer ? Math.round(value) : value, low, high);
    }
  }

  for (const key of BOOLEANS) {
    if (typeof source[key] === 'boolean') out[key] = source[key];
  }

  if (CHARSETS.includes(source.charset)) out.charset = source.charset;
  if (PRESET_NAMES.includes(source.preset) || source.preset === '') out.preset = source.preset;
  if (COLOR_MODES.includes(source.colorMode)) out.colorMode = source.colorMode;
  if (typeof source.custom === 'string') out.custom = Array.from(source.custom).slice(0, 64).join('');
  if (typeof source.fg === 'string' && HEX.test(source.fg)) out.fg = source.fg.toLowerCase();
  if (typeof source.bg === 'string' && HEX.test(source.bg)) out.bg = source.bg.toLowerCase();

  return out;
}

export function pickPipeline(settings) {
  const picked = {};
  for (const key of PIPELINE_KEYS) picked[key] = settings[key];
  return picked;
}

export function pipelineKey(settings) {
  return JSON.stringify(pickPipeline(settings));
}
