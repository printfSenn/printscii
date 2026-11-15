import { runPipeline } from '../core/pipeline.js';

let cachedId = -1;
let cachedGrid = null;

self.onmessage = (event) => {
  const { id, gridId, grid, settings } = event.data;
  try {
    if (grid) {
      cachedId = gridId;
      cachedGrid = grid;
    }
    if (!cachedGrid || cachedId !== gridId) throw new Error('Grid is missing in the worker');
    const result = runPipeline(cachedGrid, settings);
    self.postMessage({ id, ok: true, result }, [result.idx.buffer, result.gray.buffer]);
  } catch (error) {
    self.postMessage({ id, ok: false, error: String((error && error.message) || error) });
  }
};
