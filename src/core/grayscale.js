export function toGrayscale(data, count) {
  const lum = new Float32Array(count);
  for (let i = 0, p = 0; i < count; i++, p += 4) {
    lum[i] = 0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2];
  }
  return lum;
}
