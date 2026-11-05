// Δέχεται και κόμμα και τελεία ως υποδιαστολή. '' → null, σκουπίδια → NaN.
export function parseNum(s) {
  const t = String(s ?? '').trim().replace(',', '.');
  if (t === '') return null;
  const v = Number(t);
  return Number.isFinite(v) ? v : NaN;
}

export function fmt(v, digits = 3) {
  if (v == null || Number.isNaN(v)) return '';
  return v.toFixed(digits);
}

export function fmtAngle(v) {
  return fmt(v, 3).replace(/\.?0+$/, '');
}
