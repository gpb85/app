// Πεδίο αριθμού με κατάσταση: 'given' (το έδωσες), 'calc' (υπολογίστηκε) ή κενό.
export default function NumField({ id, sym, label, unit, value, onChange, state }) {
  return (
    <div className={`field ${state || ''}`}>
      <span className="field-sym">{sym}</span>
      <label htmlFor={id} className="field-body">
        <span className="field-label">{label}</span>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          placeholder="—"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
      {state && <span className="field-tag">{state === 'given' ? 'δόθηκε' : 'υπολογ.'}</span>}
      <span className="field-unit">{unit}</span>
    </div>
  );
}
