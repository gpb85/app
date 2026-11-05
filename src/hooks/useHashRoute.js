import { useEffect, useState } from 'react';

// Απλό routing με #όνομα (π.χ. #triangle). Αρκεί για τη φάση 1·
// αν χρειαστεί αργότερα, αλλάζει σε react-router χωρίς να πειραχτούν τα εργαλεία.
export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => { setHash(window.location.hash); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash;
}
