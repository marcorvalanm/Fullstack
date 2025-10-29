// Lógica pura extraída/adaptada desde Carrito.jsx

export function computeLevel(points){
  if(points >= 1000) return 3;
  if(points >= 500) return 2;
  return 1;
}

export function normalizeStoredCart(stored){
  return (stored||[]).map((i,idx)=>({
    id: i.id || idx+1,
    name: i.product,
    price: i.price,
    quantity: i.qty || 1,
    image: i.img || i.image || ""
  }));
}

export function nextQuantity(current, delta){
  const cur = Number(current);
  const base = Number.isFinite(cur) && cur > 0 ? cur : 1;
  return Math.max(1, base + delta);
}

export function parseQtyInput(value){
  if(value === "") return "";
  const q = parseInt(value, 10);
  return Number.isNaN(q) ? 1 : Math.max(1, q);
}

export function blurQty(value){
  const q = parseInt(value,10);
  return Number.isNaN(q) || q < 1 ? 1 : q;
}

export function subtotal(items){
  return (items||[]).reduce((acc,i)=>{
    const q = parseInt(i.quantity,10);
    const qty = Number.isNaN(q) ? 0 : q;
    return acc + (i.price||0) * qty;
  }, 0);
}

export function decideDiscounts(st, isDuoc, user){
  let lvlPct = 0;
  const lvl = user?.level || computeLevel(user?.points||0);
  if(lvl >= 3) lvlPct = 0.10; else if(lvl >= 2) lvlPct = 0.05;
  const levelDiscount = Math.round(st * lvlPct);
  const duocDiscount = isDuoc ? Math.round(st * 0.20) : 0;
  const applied = duocDiscount >= levelDiscount ? 'duoc' : 'level';
  const effective = applied === 'duoc' ? duocDiscount : levelDiscount;
  const total = Math.max(0, st - effective);
  return { duocDiscount, levelDiscount, applied, total };
}

export function calculateTotals(items, isDuoc, user){
  const st = subtotal(items);
  const { duocDiscount, levelDiscount, applied, total } = decideDiscounts(st, isDuoc, user);
  return { subtotal: st, duocDiscount, levelDiscount, applied, total };
}

export function awardPointsOnCheckoutPure(amountPaid, user){
  if(!user || typeof user !== 'object') return { earn:0, newPts:0, newLvl:1 };
  const earn = Math.max(0, Math.floor((amountPaid||0)/1000));
  const prevPts = Number(user.points||0);
  const newPts = prevPts + earn;
  const newLvl = computeLevel(newPts);
  return { earn, newPts, newLvl };
}

export function formatCLP(v){
  return `$${(v||0).toLocaleString('es-CL')}`;
}
