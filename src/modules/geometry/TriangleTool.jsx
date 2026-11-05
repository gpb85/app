import { useMemo, useState } from 'react';
import NumField from '../../components/NumField.jsx';
import { solveRightTriangle } from '../../lib/geometry.js';
import { parseNum, fmt, fmtAngle } from '../../lib/num.js';

// Πού βρίσκεται η γωνία θ: 'base' = κάτω κορυφή (ανάμεσα σε X και H),
// 'top' = πάνω κορυφή (ανάμεσα σε Y και H). Εσωτερικά λύνουμε πάντα με τη γωνία βάσης.
const POSITIONS = [
  { id: 'base', label: 'θ κάτω', hint: 'ανάμεσα σε X και λοξή' },
  { id: 'top', label: 'θ πάνω', hint: 'ανάμεσα σε Y και λοξή' },
];

const FIELDS = [
  { k: 'a', sym: 'θ', unit: '°' },
  { k: 'x', sym: 'X', label: 'Οριζόντια', unit: 'mm' },
  { k: 'y', sym: 'Y', label: 'Κατακόρυφη', unit: 'mm' },
  { k: 'h', sym: 'H', label: 'Λοξή (υποτείνουσα)', unit: 'mm' },
];
const EMPTY = { a: '', x: '', y: '', h: '' };
const EXAMPLE = { raw: { a: '30', x: '', y: '10', h: '' }, order: ['y', 'a'] };
const show = (k, v) => (k === 'a' ? fmtAngle(v) : fmt(v));

export default function TriangleTool() {
  const [raw, setRaw] = useState(EXAMPLE.raw);
  const [order, setOrder] = useState(EXAMPLE.order); // πιο πρόσφατο πρώτο
  const [at, setAt] = useState('base');

  const given = order.slice(0, 2);

  // result: γωνία βάσης (για το σχέδιο) · view: ό,τι βλέπει ο χρήστης (θ στη θέση που διάλεξε)
  const { result, view, message } = useMemo(() => {
    const g = {};
    for (const k of given) g[k] = parseNum(raw[k]);
    if (given.some((k) => Number.isNaN(g[k]))) return { message: { err: true, text: 'Γράψε αριθμό, π.χ. 12.5' } };
    if (given.length < 2) return { message: { text: given.length ? 'Βάλε άλλη μία τιμή.' : 'Βάλε δύο τιμές.' } };
    if (g.a != null && at === 'top') g.a = 90 - g.a;
    const r = solveRightTriangle(g);
    if (r.error) return { message: { err: true, text: r.error } };
    return { result: r, view: { ...r, a: at === 'top' ? 90 - r.a : r.a } };
  }, [raw, order, at]); // eslint-disable-line react-hooks/exhaustive-deps

  function change(k, v) {
    setRaw((r) => ({ ...r, [k]: v }));
    setOrder((o) => {
      const rest = o.filter((x) => x !== k);
      return v.trim() ? [k, ...rest] : rest;
    });
  }

  const angleLabel = at === 'base' ? 'Γωνία (από την οριζόντια X)' : 'Γωνία (από την κατακόρυφη Y)';

  return (
    <div className="tool">
      <p className="hint">Διάλεξε πού είναι η γωνία και γράψε δύο τιμές, μία τουλάχιστον πλευρά.</p>

      <div className="seg" role="radiogroup" aria-label="Θέση γωνίας θ">
        {POSITIONS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={at === p.id}
            className={at === p.id ? 'on' : ''}
            onClick={() => setAt(p.id)}
          >
            <span className="seg-label">{p.label}</span>
            <span className="seg-hint">{p.hint}</span>
          </button>
        ))}
      </div>

      <TriangleDiagram r={result} at={at} theta={view?.a} />

      <div className="fields">
        {FIELDS.map((f) => {
          const isGiven = given.includes(f.k);
          const value = isGiven ? raw[f.k] : view ? show(f.k, view[f.k]) : '';
          return (
            <NumField
              key={f.k}
              id={`tri-${f.k}`}
              {...f}
              label={f.k === 'a' ? angleLabel : f.label}
              value={value}
              onChange={(v) => change(f.k, v)}
              state={isGiven ? 'given' : view ? 'calc' : ''}
            />
          );
        })}
      </div>
      <p className={`status ${message?.err ? 'err' : ''}`} role="status">{message?.text}</p>
      <div className="actions">
        <button type="button" onClick={() => { setRaw(EMPTY); setOrder([]); }}>Καθαρισμός</button>
        <button type="button" onClick={() => { setRaw(EXAMPLE.raw); setOrder(EXAMPLE.order); }}>Παράδειγμα 30° / 10 mm</button>
      </div>
      <section className="card formulas">
        <h3>Τύποι ({at === 'base' ? 'θ κάτω' : 'θ πάνω'})</h3>
        {at === 'base' ? (
          <dl>
            <dt>Y</dt><dd>= X · tan θ</dd>
            <dt>X</dt><dd>= Y / tan θ</dd>
            <dt>θ</dt><dd>= atan(Y / X)</dd>
            <dt>H</dt><dd>= √(X² + Y²)</dd>
          </dl>
        ) : (
          <dl>
            <dt>X</dt><dd>= Y · tan θ</dd>
            <dt>Y</dt><dd>= X / tan θ</dd>
            <dt>θ</dt><dd>= atan(X / Y)</dd>
            <dt>H</dt><dd>= √(X² + Y²)</dd>
          </dl>
        )}
        <p>Οι δύο οξείες γωνίες κάνουν μαζί 90°. Στο κομπιουτεράκι: πάντα σε DEG, όχι RAD.</p>
      </section>
    </div>
  );
}

function TriangleDiagram({ r, at, theta }) {
  const D = Math.PI / 180;
  const ang = r ? Math.max(4, Math.min(80, r.a)) : at === 'top' ? 60 : 30; // γωνία βάσης για το σχήμα
  const W = 320, H = 190, pad = 34, maxW = W - 2 * pad - 20, maxH = H - 2 * pad + 8;
  let w = maxW, hgt = w * Math.tan(ang * D);
  if (hgt > maxH) { hgt = maxH; w = hgt / Math.tan(ang * D); }
  const x0 = (W - w) / 2 - 6, y0 = H - pad + 4, x1 = x0 + w, y1 = y0 - hgt;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  const nx = -Math.sin(ang * D), ny = -Math.cos(ang * D);
  const t = { fontFamily: 'var(--mono)', fontSize: 13, fill: 'var(--fg)' };
  const thetaText = `θ ${theta != null ? fmtAngle(theta) + '°' : ''}`;

  let arc, label;
  if (at === 'base') {
    const R = Math.min(30, w * 0.35);
    const bx = x0 + R * Math.cos(ang * D), by = y0 - R * Math.sin(ang * D);
    arc = `M${x0 + R},${y0} A${R},${R} 0 0 0 ${bx},${by}`;
    label = <text x={x0 + R + 6} y={y0 - 6} {...t} fontSize="12" fill="var(--accent)">{thetaText}</text>;
  } else {
    const R = Math.min(30, hgt * 0.35);
    const bx = x1 - R * Math.cos(ang * D), by = y1 + R * Math.sin(ang * D);
    arc = `M${x1},${y1 + R} A${R},${R} 0 0 1 ${bx},${by}`;
    label = <text x={x1 + 8} y={y1 + 12} {...t} fontSize="12" fill="var(--accent)">{thetaText}</text>;
  }

  return (
    <div className="card diagram" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`}>
        <polygon points={`${x0},${y0} ${x1},${y0} ${x1},${y1}`} fill="var(--accent-soft)" stroke="var(--fg)" strokeWidth="2" strokeLinejoin="round" />
        <polyline points={`${x1 - 10},${y0} ${x1 - 10},${y0 - 10} ${x1},${y0 - 10}`} fill="none" stroke="var(--muted)" strokeWidth="1.2" />
        <path d={arc} fill="none" stroke="var(--accent)" strokeWidth="2" />
        {label}
        <text x={mx} y={y0 + 20} textAnchor="middle" {...t}>X {r ? fmt(r.x) : ''}</text>
        <text x={x1 + 8} y={my + 4} {...t}>Y</text>
        {r && <text x={x1 + 8} y={my + 20} {...t} fontSize="11">{fmt(r.y)}</text>}
        <text x={mx + nx * 14} y={my + ny * 14} textAnchor="end" {...t}>H {r ? fmt(r.h) : ''}</text>
      </svg>
    </div>
  );
}
