import { useEffect, useRef } from 'react';
import { useSettings } from '../../state/SettingsContext.jsx';

export function OriginalView({ source }) {
  const { settings } = useSettings();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !source) return;
    canvas.width = source.width;
    canvas.height = source.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = settings.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0);
  }, [source, settings.bg]);

  return <canvas id="orig" ref={canvasRef} role="img" aria-label="Original image" />;
}
