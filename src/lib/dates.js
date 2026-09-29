const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// "Aug 2024" -> Date; "Present"/"Current" -> today
export function parseMonthYear(value) {
  if (!value || /present|current/i.test(value)) return new Date();
  const [mon, year] = value.split(' ');
  const m = MONTHS.indexOf(mon.slice(0, 3).toLowerCase());
  return new Date(Number(year), m < 0 ? 0 : m, 1);
}

// inclusive month count, formatted like LinkedIn: "1 yr 2 mos"
export function formatDuration(start, end) {
  const a = parseMonthYear(start);
  const b = parseMonthYear(end);
  const months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}
