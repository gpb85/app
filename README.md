# Οδηγός Συνεργείου

PWA (React + Vite) για το τμήμα CNC. Φάση 1: υπολογιστές και πίνακες, όλα client-side.

```bash
npm install
npm run dev      # τοπικά (με --host για να το ανοίξεις από το κινητό στο ίδιο Wi-Fi)
npm test         # vitest για τις καθαρές συναρτήσεις στο src/lib
npm run build    # dist/ με service worker, εγκαθίσταται ως app
```

## Δομή
- `src/modules/registry.js`: όλες οι ενότητες και τα εργαλεία. Νέο εργαλείο = component + μία εγγραφή εδώ.
- `src/modules/<ενότητα>/`: τα UI των εργαλείων.
- `src/lib/`: καθαρή λογική (γεωμετρία, parsing αριθμών) με tests.
- Routing με `#id` (π.χ. `#triangle`) μέσω `useHashRoute`.

## Επόμενα
Κοπή (Vc → n, fz → F), σπειρώματα, ανοχές ISO. Φάση 2: Node + PostgreSQL για φύλλα στησίματος και wiki
(πρώτα έγκριση από την εταιρεία για τα δεδομένα).
