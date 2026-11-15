import { ColorSection } from './panels/ColorSection.jsx';
import { DetailSection } from './panels/DetailSection.jsx';
import { ExportSection } from './panels/ExportSection.jsx';
import { ImageSection } from './panels/ImageSection.jsx';
import { ToneSection } from './panels/ToneSection.jsx';

export function ControlPanel({ image, output, dragging, charWidth }) {
  return (
    <aside className="controls" aria-label="Conversion settings">
      <ImageSection image={image} dragging={dragging} />
      <DetailSection />
      <ToneSection />
      <ColorSection />
      <ExportSection output={output} name={image.name} charWidth={charWidth} />
    </aside>
  );
}
