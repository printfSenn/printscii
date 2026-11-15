import { LIMITS } from './constants.js';

export function validateFile(file) {
  const name = String(file.name || '').toLowerCase();
  const typeOk = !file.type || file.type === 'image/png' || file.type === 'image/jpeg';
  if (!/\.(png|jpe?g)$/.test(name) || !typeOk) {
    return 'That file type is not supported. Choose a PNG, JPG or JPEG image.';
  }
  if (file.size === 0) return 'That file is empty. Choose a different image.';
  if (file.size > LIMITS.maxFileBytes) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return `That file is ${mb} MB. The maximum size is 10 MB.`;
  }
  return '';
}

export function baseName(filename) {
  const cleaned = String(filename || '')
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9_-]+/gi, '-')
    .replace(/^-+|-+$/g, '');
  return cleaned || 'printscii';
}
