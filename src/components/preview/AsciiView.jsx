import { useEffect, useRef } from 'react';
import { drawGlyphCanvas } from '../../lib/glyphCanvas.js';
import { useSettings } from '../../state/SettingsContext.jsx';

export function AsciiView({ output, fontPx, charWidth }) {
  const { settings } = useSettings();
  const canvasRef = useRef(null);
  const { result, grid } = output;
  const mono = settings.colorMode === 'mono';

  useEffect(() => {
    if (mono || !result || !grid || !canvasRef.current) return;
    drawGlyphCanvas(
      canvasRef.current,
      { ...result, data: grid.data },
      {
        colorMode: settings.colorMode,
        fg: settings.fg,
        bg: settings.bg,
        fontPx,
        scale: window.devicePixelRatio || 1,
        charWidth
      }
    );
  }, [mono, result, grid, settings.colorMode, settings.fg, settings.bg, fontPx, charWidth]);

  if (!result) return null;

  if (mono) {
    return (
      <pre id="out" style={{ color: settings.fg, background: settings.bg, fontSize: `${fontPx}px` }}>
        {result.text}
      </pre>
    );
  }

  return <canvas id="outCanvas" ref={canvasRef} role="img" aria-label="ASCII art rendered in color" />;
}
