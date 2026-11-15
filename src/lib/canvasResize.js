export function makeCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, width);
  canvas.height = Math.max(1, height);
  return canvas;
}

export function stepDownscale(source, sourceWidth, sourceHeight, targetWidth, targetHeight, background) {
  let current = source;
  let currentWidth = sourceWidth;
  let currentHeight = sourceHeight;

  while (currentWidth / 2 >= targetWidth && currentHeight / 2 >= targetHeight) {
    const nextWidth = Math.max(1, Math.floor(currentWidth / 2));
    const nextHeight = Math.max(1, Math.floor(currentHeight / 2));
    const step = makeCanvas(nextWidth, nextHeight);
    const stepCtx = step.getContext('2d');
    stepCtx.imageSmoothingEnabled = true;
    stepCtx.imageSmoothingQuality = 'high';
    stepCtx.drawImage(current, 0, 0, currentWidth, currentHeight, 0, 0, nextWidth, nextHeight);
    current = step;
    currentWidth = nextWidth;
    currentHeight = nextHeight;
  }

  const out = makeCanvas(targetWidth, targetHeight);
  const ctx = out.getContext('2d', { willReadFrequently: true });
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, out.width, out.height);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(current, 0, 0, currentWidth, currentHeight, 0, 0, out.width, out.height);
  return out;
}
