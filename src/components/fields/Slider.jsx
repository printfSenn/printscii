export function Slider({
  id,
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  format,
  disabled = false,
  flush = false
}) {
  const shown = format ? format(value) : value;
  return (
    <div className={`field${flush ? ' flush' : ''}`}>
      <div className="field-head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{shown}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
