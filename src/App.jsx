import { useHashRoute } from './hooks/useHashRoute.js';
import { sections, findRoute } from './modules/registry.js';
import { icons } from './components/icons.jsx';

export default function App() {
  const hash = useHashRoute();
  const route = findRoute(hash);

  return (
    <div className="app">
      <TopBar route={route} />
      <main className="main">
        {route.view === 'home' && <Home />}
        {route.view === 'section' && <SectionView section={route.section} />}
        {route.view === 'tool' && <route.tool.component />}
      </main>
    </div>
  );
}

function TopBar({ route }) {
  const back = route.view === 'tool' ? `#${route.section.id}` : '#';
  const title = route.view === 'home' ? 'Οδηγός Συνεργείου' : route.view === 'section' ? route.section.title : route.tool.title;
  return (
    <header className="topbar">
      {route.view !== 'home' && (
        <a className="back" href={back} aria-label="Πίσω">{icons.back}</a>
      )}
      <div className="topbar-text">
        {route.view === 'tool' && <span className="crumb">{route.section.title}</span>}
        <h1>{title}</h1>
      </div>
    </header>
  );
}

function Home() {
  return (
    <>
      <p className="hint">ΤΕΜΜΑ · τμήμα CNC. Διάλεξε ενότητα.</p>
      <nav className="grid">
        {sections.map((s) => {
          const ready = s.tools.length > 0;
          return (
            <a key={s.id} href={`#${s.id}`} className={`tile ${ready ? '' : 'soon'}`}>
              <span className="tile-icon">{icons[s.id]}</span>
              <span className="tile-title">{s.title}</span>
              <span className="tile-blurb">{s.blurb}</span>
              {!ready && <span className="tile-badge">σύντομα</span>}
            </a>
          );
        })}
      </nav>
    </>
  );
}

function SectionView({ section }) {
  if (!section.tools.length) {
    return (
      <div className="card empty">
        <span className="tile-icon">{icons[section.id]}</span>
        <h2>Ετοιμάζεται</h2>
        <p>{section.blurb}. Η ενότητα αυτή θα γεμίσει στις επόμενες εκδόσεις.</p>
        <a className="button" href="#">Στην αρχική</a>
      </div>
    );
  }
  return (
    <ul className="list">
      {section.tools.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} className="list-item">
            <span className="list-title">{t.title}</span>
            <span className="list-blurb">{t.blurb}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
