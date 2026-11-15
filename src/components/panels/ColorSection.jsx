import { useSettings } from '../../state/SettingsContext.jsx';
import { ColorField } from '../fields/ColorField.jsx';
import { Segmented } from '../fields/Segmented.jsx';

const MODE_OPTIONS = [
  { value: 'mono', label: 'Mono' },
  { value: 'color', label: 'Original' },
  { value: 'gray', label: 'Grayscale' }
];

export function ColorSection() {
  const { settings, dispatch } = useSettings();
  const set = (key) => (value) => dispatch({ type: 'set', key, value });

  return (
    <section className="sec" aria-labelledby="h-color">
      <h2 id="h-color">Color</h2>
      <Segmented
        flush
        name="color"
        legend="Color mode"
        options={MODE_OPTIONS}
        value={settings.colorMode}
        onChange={set('colorMode')}
      />
      <div className="two field">
        <ColorField id="fg" label="Ink" value={settings.fg} onChange={set('fg')} />
        <ColorField id="bg" label="Paper" value={settings.bg} onChange={set('bg')} />
      </div>
      <p className="hint">Ink applies in Mono. Transparent areas of a PNG are filled with the paper color.</p>
    </section>
  );
}
