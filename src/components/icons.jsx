// Απλά γραμμικά εικονίδια, παίρνουν χρώμα από currentColor.
const base = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const icons = {
  geometry: <svg {...base}><path d="M4 20h16L20 6z" /><path d="M8 20a4 4 0 0 0-1-2.6" /></svg>,
  cutting: <svg {...base}><circle cx="12" cy="12" r="7" /><path d="M12 5v3M12 16v3M5 12h3M16 12h3" /><circle cx="12" cy="12" r="1.5" /></svg>,
  threads: <svg {...base}><path d="M9 3h6v4H9zM10 7v14h4V7" /><path d="M10 10l4-1M10 13l4-1M10 16l4-1M10 19l4-1" /></svg>,
  tolerances: <svg {...base}><path d="M4 8h16M4 16h16" /><path d="M7 5v6M17 13v6" /><path d="M12 4v16" strokeDasharray="2 2" /></svg>,
  materials: <svg {...base}><path d="M3 8l9-4 9 4-9 4z" /><path d="M3 8v8l9 4 9-4V8" /><path d="M12 12v8" /></svg>,
  machines: <svg {...base}><rect x="3" y="4" width="18" height="13" rx="1" /><path d="M12 4v6M9 10h6" /><path d="M7 20h10" /></svg>,
  setups: <svg {...base}><rect x="4" y="11" width="16" height="6" rx="1" /><path d="M8 11V7h3v4M13 11V7h3v4" /><path d="M2 20h20" /></svg>,
  wiki: <svg {...base}><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path d="M5 17a3 3 0 0 1 3-3h11" /></svg>,
  back: <svg {...base} width="22" height="22"><path d="M15 5l-7 7 7 7" /></svg>,
};
