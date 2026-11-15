import { runPipeline } from '../core/pipeline.js';
import { createWorker } from './createWorker.js';

let gridCounter = 0;
const gridIds = new WeakMap();

function idFor(grid) {
  let id = gridIds.get(grid);
  if (id === undefined) {
    gridCounter += 1;
    id = gridCounter;
    gridIds.set(grid, id);
  }
  return id;
}

function runInline(entry) {
  try {
    entry.resolve(runPipeline(entry.grid, entry.settings));
  } catch (error) {
    entry.reject(error);
  }
}

export function createConverter() {
  const pending = new Map();
  let worker = null;
  let sentGridId = 0;
  let sequence = 0;

  function retire() {
    if (worker) {
      worker.terminate();
      worker = null;
    }
  }

  try {
    worker = createWorker();
    worker.onmessage = (event) => {
      const { id, ok, result, error } = event.data;
      const entry = pending.get(id);
      if (!entry) return;
      pending.delete(id);
      if (ok) entry.resolve(result);
      else entry.reject(new Error(error));
    };
    worker.onerror = () => {
      const stranded = Array.from(pending.values());
      pending.clear();
      retire();
      stranded.forEach(runInline);
    };
  } catch (error) {
    worker = null;
  }

  function convert(grid, settings) {
    return new Promise((resolve, reject) => {
      const entry = { grid, settings, resolve, reject };
      if (!worker) {
        Promise.resolve().then(() => runInline(entry));
        return;
      }
      sequence += 1;
      const id = sequence;
      const gridId = idFor(grid);
      pending.set(id, entry);
      const message = { id, gridId, settings };
      if (sentGridId !== gridId) {
        message.grid = grid;
        sentGridId = gridId;
      }
      worker.postMessage(message);
    });
  }

  return { convert, usesWorker: () => worker !== null };
}

let shared = null;

export function getConverter() {
  if (!shared) shared = createConverter();
  return shared;
}
