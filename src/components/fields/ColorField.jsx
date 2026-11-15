export function ColorField({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="color" value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
