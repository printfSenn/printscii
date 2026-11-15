import { useCallback, useMemo, useRef, useState } from 'react';
import { baseName, validateFile } from '../core/validate.js';
import { loadImage } from '../lib/loadImage.js';
import { createSample } from '../lib/sample.js';

const INITIAL = { source: null, name: 'printscii', loading: false, error: '' };

export function useImageSource() {
  const [state, setState] = useState(INITIAL);
  const token = useRef(0);

  const loadFile = useCallback(async (file) => {
    const problem = validateFile(file);
    if (problem) {
      setState((prev) => ({ ...prev, error: problem }));
      return;
    }
    token.current += 1;
    const mine = token.current;
    setState((prev) => ({ ...prev, loading: true, error: '' }));
    try {
      const canvas = await loadImage(file);
      if (mine !== token.current) return;
      setState({ source: canvas, name: baseName(file.name), loading: false, error: '' });
    } catch (error) {
      if (mine !== token.current) return;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'PRINTSCII could not read that image. It may be damaged or use an unsupported encoding.'
      }));
    }
  }, []);

  const loadSample = useCallback(() => {
    token.current += 1;
    setState({ source: createSample(), name: 'sample', loading: false, error: '' });
  }, []);

  const clear = useCallback(() => {
    token.current += 1;
    setState(INITIAL);
  }, []);

  return useMemo(
    () => ({ ...state, loadFile, loadSample, clear }),
    [state, loadFile, loadSample, clear]
  );
}
