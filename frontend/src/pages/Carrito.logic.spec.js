import {
  computeLevel,
  normalizeStoredCart,
  nextQuantity,
  parseQtyInput,
  blurQty,
  subtotal,
  decideDiscounts,
  calculateTotals,
  awardPointsOnCheckoutPure,
  formatCLP
} from './Carrito.logic.js';

describe('Carrito.logic', () => {
  it('computeLevel: returns 1,2,3 according to points thresholds', () => {
    expect(computeLevel(0)).toBe(1);
    expect(computeLevel(499)).toBe(1);
    expect(computeLevel(500)).toBe(2);
    expect(computeLevel(999)).toBe(2);
    expect(computeLevel(1000)).toBe(3);
    expect(computeLevel(5000)).toBe(3);
  });

  it('normalizeStoredCart: maps backend format to UI format', () => {
    const input = [
      { product:'A', price:1000, qty:2, img:'x' },
      { id: 9, product:'B', price:500, qty:1 },
    ];
    const out = normalizeStoredCart(input);
    expect(out[0]).toEqual({ id:1, name:'A', price:1000, quantity:2, image:'x' });
    expect(out[1]).toEqual({ id:9, name:'B', price:500, quantity:1, image:'' });
  });

  it('nextQuantity: increases/decreases but never below 1', () => {
    expect(nextQuantity(1, 1)).toBe(2);
    expect(nextQuantity(3, -1)).toBe(2);
    expect(nextQuantity(1, -1)).toBe(1);
    // non-numeric current treated as 1
    expect(nextQuantity(undefined, 1)).toBe(2);
    expect(nextQuantity('x', 0)).toBe(1);
  });

  it('parseQtyInput: supports empty string, invalid, and valid values', () => {
    expect(parseQtyInput('')).toBe('');
    expect(parseQtyInput('abc')).toBe(1);
    expect(parseQtyInput('0')).toBe(1);
    expect(parseQtyInput('5')).toBe(5);
  });

  it('blurQty: coerces to at least 1 and numeric', () => {
    expect(blurQty('')).toBe(1);
    expect(blurQty('0')).toBe(1);
    expect(blurQty('3')).toBe(3);
  });

  it('subtotal: sums price * quantity, ignoring NaN quantities', () => {
    const items = [
      { price: 1000, quantity: 2 },
      { price: 2500, quantity: 'x' },
      { price: 500, quantity: 3 }
    ];
    expect(subtotal(items)).toBe(1000*2 + 0 + 500*3);
  });

  it('decideDiscounts: chooses larger between DUOC(20%) and level(5/10%)', () => {
    const st = 10000;
    // Case 1: DUOC wins vs level 5%
    let r = decideDiscounts(st, true, { level:2 });
    expect(r.applied).toBe('duoc');
    expect(r.duocDiscount).toBe(2000);
    expect(r.levelDiscount).toBe(500);
    expect(r.total).toBe(8000);
    // Case 2: Level 10% wins when user lvl3 and not DUOC
    r = decideDiscounts(st, false, { level:3 });
    expect(r.applied).toBe('level');
    expect(r.levelDiscount).toBe(1000);
    expect(r.duocDiscount).toBe(0);
    expect(r.total).toBe(9000);
  });

  it('calculateTotals: end-to-end with user points determining level', () => {
    const items = [ { price: 1000, quantity: 2 } ];
    const user = { points: 1200 }; // level 3 -> 10%
    const res = calculateTotals(items, false, user);
    expect(res.subtotal).toBe(2000);
    expect(res.levelDiscount).toBe(200);
    expect(res.total).toBe(1800);
  });

  it('awardPointsOnCheckoutPure: earns 1pt per $1000 and returns new level', () => {
    const out = awardPointsOnCheckoutPure(7500, { points: 10 });
    expect(out.earn).toBe(7);
    expect(out.newPts).toBe(17);
    expect(out.newLvl).toBe(computeLevel(17));
  });

  it('formatCLP: formats number to CLP locale with $ prefix', () => {
    const s = formatCLP(1234567);
    expect(s.startsWith('$')).toBeTrue();
    // es-CL thousands separator is a period; toLocaleString can depend on env, so check digits presence
    expect(s.replace(/\D/g,'')).toBe('1234567');
  });
});
