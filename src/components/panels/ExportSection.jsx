import { useState } from 'react';
import { copyText } from '../../lib/clipboard.js';
import { downloadPng, downloadText } from '../../lib/exporters.js';
import { useSettings } from '../../state/SettingsContext.jsx';
import { useToast } from '../../state/ToastContext.jsx';
import { SelectField } from '../fields/SelectField.jsx';

const SCALE_OPTIONS = [
  { value: '1', label: '1x' },
  { value: '2', label: '2x' },
  { value: '4', label: '4x' }
];

export function ExportSection({ output, name, charWidth }) {
  const { settings } = useSettings();
  const toast = useToast();
  const [scale, setScale] = useState('2');
  const { result, grid } = output;
  const ready = Boolean(result && grid);

  const onCopy = async () => {
    const ok = await copyText(result.text);
    toast(ok ? 'Copied to clipboard' : 'Copy failed. Download the .txt instead.');
  };

  const onText = () => {
    downloadText(result.text, name);
    toast('Downloaded the .txt file');
  };

  const onPng = async () => {
    const wanted = Number(scale);
    try {
      const used = await downloadPng({
        art: { ...result, data: grid.data },
        style: { colorMode: settings.colorMode, fg: settings.fg, bg: settings.bg },
        scale: wanted,
        charWidth,
        name
      });
      toast(
        used < wanted - 0.01
          ? `Downloaded the .png at ${used.toFixed(1)}x, the largest size this browser allows`
          : 'Downloaded the .png file'
      );
    } catch (error) {
      toast('The PNG could not be created. Try a lower scale or resolution.');
    }
  };

  return (
    <section className="sec" aria-labelledby="h-export">
      <h2 id="h-export">Export</h2>
      <div className="row flush">
        <button className="btn primary" type="button" disabled={!ready} onClick={onCopy}>
          Copy text
        </button>
        <button className="btn" type="button" disabled={!ready} onClick={onText}>
          Download .txt
        </button>
      </div>
      <div className="two field export-png">
        <SelectField id="pngScale" label="PNG scale" options={SCALE_OPTIONS} value={scale} onChange={setScale} />
        <button className="btn" type="button" disabled={!ready} onClick={onPng}>
          Download .png
        </button>
      </div>
    </section>
  );
}
