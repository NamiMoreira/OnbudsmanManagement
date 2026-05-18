export function sanitizeBoolean(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const str = value.toLowerCase().trim();
    return str === 'true' || str === '1' || str === 'yes';
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  return Boolean(value);
}