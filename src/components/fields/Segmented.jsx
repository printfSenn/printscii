export function Segmented({ name, legend, options, value, onChange, hideLegend = false, flush = false }) {
  return (
    <fieldset className={flush ? 'flush' : undefined}>
      <legend className={hideLegend ? 'sr' : undefined}>{legend}</legend>
      <div className="seg">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
