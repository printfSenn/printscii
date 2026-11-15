export function applyEdges(lum, width, height) {
  const out = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    const above = Math.max(0, y - 1) * width;
    const below = Math.min(height - 1, y + 1) * width;
    const row = y * width;
    for (let x = 0; x < width; x++) {
      const left = Math.max(0, x - 1);
      const right = Math.min(width - 1, x + 1);
      const topLeft = lum[above + left];
      const top = lum[above + x];
      const topRight = lum[above + right];
      const midLeft = lum[row + left];
      const midRight = lum[row + right];
      const bottomLeft = lum[below + left];
      const bottom = lum[below + x];
      const bottomRight = lum[below + right];
      const gx = -topLeft - 2 * midLeft - bottomLeft + topRight + 2 * midRight + bottomRight;
      const gy = -topLeft - 2 * top - topRight + bottomLeft + 2 * bottom + bottomRight;
      out[row + x] = Math.min(1, Math.sqrt(gx * gx + gy * gy) / 400);
    }
  }
  return out;
}
