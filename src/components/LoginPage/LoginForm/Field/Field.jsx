import './Field.scss';

export default function Field({ value, type, name, placeholder, onChange }) {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;
  return (
    <div className="field">
      <input
        value={value}
        onChange={handleChange}
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}
