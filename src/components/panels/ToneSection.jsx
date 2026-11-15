import { useSettings } from '../../state/SettingsContext.jsx';
import { Slider } from '../fields/Slider.jsx';
import { Toggle } from '../fields/Toggle.jsx';

export function ToneSection() {
  const { settings, dispatch } = useSettings();
  const set = (key) => (value) => dispatch({ type: 'set', key, value });

  return (
    <section className="sec" aria-labelledby="h-tone">
      <h2 id="h-tone">Tone and sharpness</h2>
      <Slider flush id="sharpness" label="Sharpness" min={0} max={100} value={settings.sharpness} onChange={set('sharpness')} />
      <Toggle id="edges" label="Edge enhancement (Sobel)" checked={settings.edges} onChange={set('edges')} />
      <Slider
        id="edgeStrength"
        label="Edge strength"
        min={0}
        max={100}
        value={settings.edgeStrength}
        disabled={!settings.edges}
        onChange={set('edgeStrength')}
      />
      <Slider id="contrast" label="Contrast" min={-100} max={100} value={settings.contrast} onChange={set('contrast')} />
      <Slider id="brightness" label="Brightness" min={-100} max={100} value={settings.brightness} onChange={set('brightness')} />
      <Slider
        id="gamma"
        label="Gamma"
        min={0.2}
        max={3}
        step={0.05}
        value={settings.gamma}
        format={(v) => Number(v).toFixed(2)}
        onChange={set('gamma')}
      />
      <Toggle id="dither" label="Dithering (Floyd-Steinberg)" checked={settings.dither} onChange={set('dither')} />
      <Toggle id="invert" label="Invert tones" checked={settings.invert} onChange={set('invert')} />
    </section>
  );
}
