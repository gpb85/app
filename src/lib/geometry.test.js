import { describe, it, expect } from 'vitest';
import { solveRightTriangle, boltCircle } from './geometry.js';

describe('solveRightTriangle', () => {
  it('γωνία + απέναντι', () => {
    const r = solveRightTriangle({ a: 30, y: 10 });
    expect(r.x).toBeCloseTo(17.3205, 4);
    expect(r.h).toBeCloseTo(20, 6);
  });
  it('δύο κάθετες', () => {
    const r = solveRightTriangle({ x: 3, y: 4 });
    expect(r.h).toBeCloseTo(5);
    expect(r.a).toBeCloseTo(53.1301, 4);
  });
  it('λοξή μικρότερη από κάθετη → σφάλμα', () => {
    expect(solveRightTriangle({ x: 10, h: 5 }).error).toBeTruthy();
  });
  it('γωνία εκτός ορίων → σφάλμα', () => {
    expect(solveRightTriangle({ a: 90, x: 5 }).error).toBeTruthy();
  });
});

describe('boltCircle', () => {
  it('4 οπές σε Ø100', () => {
    const r = boltCircle({ d: 100, n: 4 });
    expect(r.holes[1].x).toBeCloseTo(0);
    expect(r.holes[1].y).toBeCloseTo(50);
    expect(r.chord).toBeCloseTo(70.7107, 4);
  });
});
