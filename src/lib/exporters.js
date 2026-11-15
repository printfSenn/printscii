import { drawGlyphCanvas } from './glyphCanvas.js';

export function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function downloadText(text, name) {
  saveBlob(new Blob([text], { type: 'text/plain;charset=utf-8' }), `printscii-${name}.txt`);
}

export function downloadPng({ art, style, scale, charWidth, name }) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    let used;
    try {
      used = drawGlyphCanvas(canvas, art, { ...style, fontPx: 10, scale, charWidth });
    } catch (error) {
      reject(error);
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('png'));
        return;
      }
      saveBlob(blob, `printscii-${name}.png`);
      resolve(used);
    }, 'image/png');
  });
}
