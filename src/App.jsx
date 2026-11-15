import { useMemo } from 'react';
import { ControlPanel } from './components/ControlPanel.jsx';
import { Header } from './components/Header.jsx';
import { Preview } from './components/preview/Preview.jsx';
import { useConversion } from './hooks/useConversion.js';
import { useImageSource } from './hooks/useImageSource.js';
import { useWindowDrop } from './hooks/useWindowDrop.js';
import { measureCharWidth } from './lib/charMetrics.js';
import { useSettings } from './state/SettingsContext.jsx';

export default function App() {
  const { settings } = useSettings();
  const image = useImageSource();
  const charWidth = useMemo(measureCharWidth, []);
  const output = useConversion(image.source, settings, charWidth);
  const dragging = useWindowDrop(image.loadFile);

  return (
    <>
      <a className="skip" href="#preview">
        Skip to preview
      </a>
      <div className="form">
        <span className="edge edge-l" aria-hidden="true" />
        <span className="edge edge-r" aria-hidden="true" />
        <Header />
        <main className="layout">
          <ControlPanel image={image} output={output} dragging={dragging} charWidth={charWidth} />
          <Preview image={image} output={output} settings={settings} charWidth={charWidth} />
        </main>
      </div>
    </>
  );
}
