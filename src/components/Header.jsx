import { useEffect, useState } from 'react';
import { ROW_COUNT } from '../lib/wordmark.js';
import { Wordmark } from './Wordmark.jsx';

function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Header() {
  const [printed, setPrinted] = useState(() => (prefersReducedMotion() ? ROW_COUNT : 0));

  useEffect(() => {
    if (printed >= ROW_COUNT) return undefined;
    const timer = setTimeout(() => setPrinted((count) => count + 1), 140);
    return () => clearTimeout(timer);
  }, [printed]);

  return (
    <header className="top">
      <h1 className="sr">PRINTSCII</h1>
      <Wordmark printed={printed} />
      <p className="tagline">Drop in a picture and get line-printer art back. The image never leaves this tab.</p>
    </header>
  );
}
