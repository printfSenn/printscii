import { useEffect, useMemo, useRef, useState } from 'react';
import { LINE_HEIGHT } from '../core/constants.js';
import { pickPipeline, pipelineKey } from '../core/settings.js';
import { resizeToGrid } from '../lib/resizeToGrid.js';
import { getConverter } from '../worker/client.js';
import { useDebouncedValue } from './useDebouncedValue.js';

const EMPTY = Object.freeze({ result: null, grid: null, source: null, busy: false, error: '' });
const FAILURE =
  'Something went wrong while converting this image. Try a lower resolution or a smaller image.';

export function useConversion(source, settings, charWidth) {
  const key = pipelineKey(settings);
  const pipeline = useMemo(() => pickPipeline(settings), [key]);
  const debounced = useDebouncedValue(pipeline, 90);
  const [state, setState] = useState(EMPTY);
  const gridCache = useRef({ source: null, cols: 0, bg: '', grid: null });

  useEffect(() => {
    if (!source) {
      setState(EMPTY);
      return undefined;
    }

    let cancelled = false;
    setState((prev) => ({ ...prev, busy: true, error: '' }));

    const timer = setTimeout(async () => {
      try {
        const cache = gridCache.current;
        let grid = cache.grid;
        if (
          !grid ||
          cache.source !== source ||
          cache.cols !== debounced.cols ||
          cache.bg !== debounced.bg
        ) {
          grid = resizeToGrid(source, debounced.cols, debounced.bg, charWidth / LINE_HEIGHT);
          gridCache.current = { source, cols: debounced.cols, bg: debounced.bg, grid };
        }
        const result = await getConverter().convert(grid, debounced);
        if (!cancelled) setState({ result, grid, source, busy: false, error: '' });
      } catch (error) {
        if (!cancelled) setState((prev) => ({ ...prev, busy: false, error: FAILURE }));
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [source, debounced, charWidth]);

  return state;
}
