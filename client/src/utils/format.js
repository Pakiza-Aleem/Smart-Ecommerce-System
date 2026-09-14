// utils/format.js - shared formatting helpers
export function formatPKR(amount) {
  const n = Number(amount) || 0;
  return `PKR ${n.toLocaleString('en-PK')}`;
}
