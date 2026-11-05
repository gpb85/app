// Καθαρές συναρτήσεις γεωμετρίας: χωρίς React, εύκολα testable.
const DEG = Math.PI / 180;

/**
 * Λύνει ορθογώνιο τρίγωνο από δύο γνωστές τιμές.
 * a = γωνία θ (μοίρες, στη βάση), x = προσκείμενη, y = απέναντι, h = υποτείνουσα.
 * Επιστρέφει { a, x, y, h } ή { error }.
 */
export function solveRightTriangle(given) {
  const has = (k) => given[k] != null;
  const keys = ['a', 'x', 'y', 'h'].filter(has);
  if (keys.length !== 2) return { error: 'Βάλε ακριβώς δύο τιμές.' };

  let { a, x, y, h } = given;
  if (has('a') && (a <= 0 || a >= 90)) return { error: 'Η γωνία πρέπει να είναι πάνω από 0° και κάτω από 90°.' };
  for (const k of ['x', 'y', 'h']) {
    if (has(k) && given[k] <= 0) return { error: 'Οι πλευρές πρέπει να είναι θετικές.' };
  }

  if (has('a') && has('x')) { y = x * Math.tan(a * DEG); h = x / Math.cos(a * DEG); }
  else if (has('a') && has('y')) { x = y / Math.tan(a * DEG); h = y / Math.sin(a * DEG); }
  else if (has('a') && has('h')) { x = h * Math.cos(a * DEG); y = h * Math.sin(a * DEG); }
  else if (has('x') && has('y')) { h = Math.hypot(x, y); a = Math.atan2(y, x) / DEG; }
  else if (has('x') && has('h')) {
    if (h <= x) return { error: 'Η λοξή (H) πρέπει να είναι μεγαλύτερη από το X.' };
    y = Math.sqrt(h * h - x * x); a = Math.acos(x / h) / DEG;
  } else if (has('y') && has('h')) {
    if (h <= y) return { error: 'Η λοξή (H) πρέπει να είναι μεγαλύτερη από το Y.' };
    x = Math.sqrt(h * h - y * y); a = Math.asin(y / h) / DEG;
  }
  return { a, x, y, h };
}

/**
 * Κύκλος οπών (PCD): συντεταγμένες N οπών σε διάμετρο D.
 * startDeg: γωνία πρώτης οπής από τον άξονα +X (αριστερόστροφα).
 */
export function boltCircle({ d, n, startDeg = 0, cx = 0, cy = 0 }) {
  if (!(d > 0)) return { error: 'Η διάμετρος πρέπει να είναι θετική.' };
  if (!Number.isInteger(n) || n < 2 || n > 360) return { error: 'Οι οπές πρέπει να είναι ακέραιος από 2 έως 360.' };
  const r = d / 2;
  const step = 360 / n;
  const holes = Array.from({ length: n }, (_, i) => {
    const ang = startDeg + i * step;
    return { i: i + 1, ang, x: cx + r * Math.cos(ang * DEG), y: cy + r * Math.sin(ang * DEG) };
  });
  return { holes, step, chord: d * Math.sin((180 / n) * DEG) };
}
