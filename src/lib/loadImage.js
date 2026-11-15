import { LIMITS } from '../core/constants.js';
import { stepDownscale } from './canvasResize.js';

function decodeWithImageElement(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    img.src = url;
  });
}

async function decode(file) {
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch (error) {
    return decodeWithImageElement(file);
  }
}

function drawScaled(image) {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (!width || !height) throw new Error('empty');
  const k = Math.min(1, LIMITS.maxSourceSide / Math.max(width, height));
  const targetWidth = Math.max(1, Math.round(width * k));
  const targetHeight = Math.max(1, Math.round(height * k));
  return stepDownscale(image, width, height, targetWidth, targetHeight, null);
}

export async function loadImage(file) {
  const image = await decode(file);
  const canvas = drawScaled(image);
  if (typeof image.close === 'function') image.close();
  return canvas;
}
