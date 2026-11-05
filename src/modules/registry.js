// Ο «χάρτης» της εφαρμογής. Νέα ενότητα ή εργαλείο = μία εγγραφή εδώ.
import TriangleTool from './geometry/TriangleTool.jsx';
import BoltCircleTool from './geometry/BoltCircleTool.jsx';

export const sections = [
  {
    id: 'geometry',
    title: 'Γεωμετρικά',
    blurb: 'Τρίγωνα, κύκλοι οπών, φάλτσα',
    tools: [
      { id: 'triangle', title: 'Ορθογώνιο τρίγωνο', blurb: 'Γωνία, X, Y, λοξή από δύο γνωστά', component: TriangleTool },
      { id: 'pcd', title: 'Κύκλος οπών (PCD)', blurb: 'Συντεταγμένες οπών σε διάμετρο', component: BoltCircleTool },
    ],
  },
  { id: 'cutting', title: 'Κοπή', blurb: 'Στροφές, πρόωση, Vc ανά υλικό', tools: [] },
  { id: 'threads', title: 'Σπειρώματα', blurb: 'Τρύπα σπειρώματος, ροπές βιδών', tools: [] },
  { id: 'tolerances', title: 'Ανοχές ISO', blurb: 'H7, g6 και όρια σε mm', tools: [] },
  { id: 'materials', title: 'Υλικά', blurb: 'Αλουμίνια, χάλυβες, τι προσέχεις', tools: [] },
  { id: 'machines', title: 'Μηχανές', blurb: 'DMU, CMX, CLX, κώδικες, alarms', tools: [] },
  { id: 'setups', title: 'Φύλλα στησίματος', blurb: 'Ιδιοσυσκευή, ροπή σύσφιξης, εργαλεία', tools: [] },
  { id: 'wiki', title: 'Κόλπα συνεργείου', blurb: 'Ό,τι ξέρουν οι παλιοί', tools: [] },
];

export function findRoute(hash) {
  const id = hash.replace(/^#/, '');
  if (!id) return { view: 'home' };
  for (const s of sections) {
    if (s.id === id) return { view: 'section', section: s };
    const tool = s.tools.find((t) => t.id === id);
    if (tool) return { view: 'tool', section: s, tool };
  }
  return { view: 'home' };
}
