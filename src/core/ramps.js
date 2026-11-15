import { clamp } from './math.js';

export const STANDARD = ' .:-=+*#%@';
export const DETAILED = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
export const BLOCKS = '░▒▓█';
export const BINARY = '01';

export function subsample(chars, count) {
  const n = Math.max(2, Math.floor(count));
  if (n >= chars.length) return chars.slice();
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(chars[Math.round((i * (chars.length - 1)) / (n - 1))]);
  }
  return out;
}

export function getRamp(settings) {
  switch (settings.charset) {
    case 'standard':
      return Array.from(STANDARD);
    case 'blocks':
      return Array.from(BLOCKS);
    case 'binary':
      return Array.from(BINARY);
    case 'custom': {
      const chars = Array.from(settings.custom.replace(/[\r\n]/g, ''));
      return chars.length >= 2 ? chars : Array.from(STANDARD);
    }
    default: {
      const lightToDense = Array.from(DETAILED).reverse();
      return subsample(lightToDense, clamp(settings.rampLen, 2, lightToDense.length));
    }
  }
}
