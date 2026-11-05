import { useMemo, useState } from 'react';
import NumField from '../../components/NumField.jsx';
import { boltCircle } from '../../lib/geometry.js';
import { parseNum, fmt, fmtAngle } from '../../lib/num.js';

export default function BoltCircleTool() {
  const [d, setD] = useState('100');
  const [n, setN] = useState('6');
  const [start, setStart] = useState('0');

  const res = useMemo(() => {
    const dv = parseNum(d), nv = parseNum(n), sv = parseNum(start) ?? 0;
    if (dv == null || nv == null) return { error: 'Βάλε διάμετρο και αριθμό οπών.' };
    if ([dv, nv, sv].some(Number.isNaN)) return { error: 'Γράψε αριθμό, π.χ. 12.5' };
    return boltCircle({ d: dv, n: nv, startDeg: sv });
  }, [d, n, start]);

  return (
    <div className="tool">
      <p className="hint">Κέντρο κύκλου στο (0, 0). Οι γωνίες μετράνε από τον +X αριστερόστροφα.</p>
      {!res.error && <BoltDiagram holes={res.holes} d={parseNum(d)} />}
      <div className="fields">
        <NumField id="pcd-d" sym="Ø" label="Διάμετρος κύκλου οπών" unit="mm" value={d} onChange={setD} />
        <NumField id="pcd-n" sym="N" label="Αριθμός οπών" unit="τεμ." value={n} onChange={setN} />
        <NumField id="pcd-s" sym="α₀" label="Γωνία πρώτης οπής" unit="°" value={start} onChange={setStart} />
      </div>
      {res.error ? (
        <p className="status err" role="status">{res.error}</p>
      ) : (
        <>
          <p className="status">Βήμα {fmtAngle(res.step)}° · απόσταση διαδοχικών οπών (χορδή) <strong>{fmt(res.chord)} mm</strong></p>
          <div className="card table-wrap">
            <table>
              <thead><tr><th>#</th><th>Γωνία</th><th>X</th><th>Y</th></tr></thead>
              <tbody>
                {res.holes.map((h) => (
                  <tr key={h.i}>
                    <td>{h.i}</td><td>{fmtAngle(h.ang)}°</td><td>{fmt(h.x)}</td><td>{fmt(h.y)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function BoltDiagram({ holes }) {
  const S = 200, c = S / 2, R = 70;
  const maxR = Math.max(...holes.map((h) => Math.hypot(h.x, h.y))) || 1;
  const k = R / maxR;
  return (
    <div className="card diagram" aria-hidden="true">
      <svg viewBox={`0 0 ${S} ${S}`} style={{ maxHeight: 220 }}>
        <line x1="10" y1={c} x2={S - 10} y2={c} stroke="var(--line)" strokeDasharray="4 3" />
        <line x1={c} y1="10" x2={c} y2={S - 10} stroke="var(--line)" strokeDasharray="4 3" />
        <circle cx={c} cy={c} r={R} fill="none" stroke="var(--muted)" strokeDasharray="6 4" />
        {holes.map((h) => (
          <g key={h.i}>
            <circle cx={c + h.x * k} cy={c - h.y * k} r={holes.length > 24 ? 2.5 : 6} fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
            {holes.length <= 24 && (
              <text x={c + h.x * k * 1.22} y={c - h.y * k * 1.22 + 4} textAnchor="middle" fontSize="10" fontFamily="var(--mono)" fill="var(--fg)">{h.i}</text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
