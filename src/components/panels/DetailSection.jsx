import { LIMITS } from '../../core/constants.js';
import { useSettings } from '../../state/SettingsContext.jsx';
import { Segmented } from '../fields/Segmented.jsx';
import { SelectField } from '../fields/SelectField.jsx';
import { Slider } from '../fields/Slider.jsx';
import { TextField } from '../fields/TextField.jsx';

const PRESET_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'ultra', label: 'Ultra' }
];

const CHARSET_OPTIONS = [
  { value: 'standard', label: 'Standard (10 characters)' },
  { value: 'detailed', label: 'Detailed (70 characters)' },
  { value: 'blocks', label: 'Blocks (░▒▓█)' },
  { value: 'binary', label: 'Binary (0 and 1)' },
  { value: 'custom', label: 'Custom' }
];

export function DetailSection() {
  const { settings, dispatch } = useSettings();
  const set = (key) => (value) => dispatch({ type: 'set', key, value });

  return (
    <section className="sec" aria-labelledby="h-detail">
      <div className="sec-bar">
        <h2 id="h-detail">Detail</h2>
        <button className="btn small" type="button" onClick={() => dispatch({ type: 'reset' })}>
          Reset settings
        </button>
      </div>
      <Slider
        flush
        id="cols"
        label="Resolution (characters wide)"
        min={LIMITS.minCols}
        max={LIMITS.maxCols}
        value={settings.cols}
        onChange={set('cols')}
      />
      <Segmented
        name="preset"
        legend="Detail level"
        options={PRESET_OPTIONS}
        value={settings.preset}
        onChange={(name) => dispatch({ type: 'preset', name })}
      />
      <SelectField
        id="charset"
        label="Character set"
        options={CHARSET_OPTIONS}
        value={settings.charset}
        onChange={(value) => dispatch({ type: 'charset', value })}
      />
      {settings.charset === 'custom' ? (
        <TextField
          id="custom"
          label="Your characters, darkest pixel first"
          value={settings.custom}
          placeholder=" .oO@"
          hint="Use at least two characters. Start with a space to keep the background clean."
          onChange={set('custom')}
        />
      ) : null}
    </section>
  );
}
