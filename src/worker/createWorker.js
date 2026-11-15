export function createWorker() {
  return new Worker(new URL('./convert.worker.js', import.meta.url), { type: 'module' });
}
