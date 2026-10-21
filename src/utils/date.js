/**
 * Pure date helpers.
 *
 * All dates in this project are stored as unambiguous 'YYYY-MM-DD' strings and
 * parsed as *local* calendar dates. `new Date('2025-12-17')` is parsed as UTC
 * midnight by the language, which shifts the day backwards in negative-offset
 * timezones — so dates are always constructed from their parts instead.
 */

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Days in a given month. `month` is 0-indexed. */
export const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

/**
 * Parse a date into a local Date at midnight.
 * @param {string|Date} value
 * @returns {Date}
 */
export function parseDate(value) {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) throw new Error(`Invalid date: ${value}`);
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    const m = DATE_RE.exec(trimmed);
    if (m) {
      const [, y, mo, d] = m.map(Number);
      const parsed = new Date(y, mo - 1, d);
      // Reject impossible dates like 2025-02-30, which JS would roll over.
      if (parsed.getFullYear() !== y || parsed.getMonth() !== mo - 1 || parsed.getDate() !== d) {
        throw new Error(`Invalid date: "${value}"`);
      }
      return parsed;
    }
    const fallback = new Date(trimmed);
    if (Number.isNaN(fallback.getTime())) throw new Error(`Invalid date: "${value}"`);
    return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate());
  }

  throw new Error(`Invalid date: ${String(value)}`);
}

/** Midnight on the given date, in local time. */
export const toDay = (value) => parseDate(value);

/**
 * Whole calendar months between two dates.
 *
 * Counts completed months by comparing year/month/day fields, so month lengths
 * (28/29/30/31 days) and leap years are handled exactly — no day-count
 * division. The anniversary is clamped to the length of the end month, so a
 * 31 Jan start reaches its 1-month mark on 28 Feb rather than 3 Mar.
 *
 * @returns {number} completed months, never negative
 */
export function monthsBetween(start, end) {
  const s = toDay(start);
  const e = toDay(end);
  if (e < s) return 0;

  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());

  const anniversary = Math.min(s.getDate(), daysInMonth(e.getFullYear(), e.getMonth()));
  if (e.getDate() < anniversary) months -= 1;

  return Math.max(0, months);
}

/** Split a month count into years + remaining months. */
export function splitDuration(totalMonths) {
  const safe = Math.max(0, Math.floor(totalMonths) || 0);
  return {
    years: Math.floor(safe / 12),
    months: safe % 12,
    totalMonths: safe,
  };
}

/**
 * Human-readable duration: "10 Months", "1 Year", "1 Year 3 Months".
 */
export function formatDuration(totalMonths) {
  const { years, months } = splitDuration(totalMonths);
  if (years === 0 && months === 0) return 'Less than a month';
  if (years === 0) return `${months} ${months === 1 ? 'Month' : 'Months'}`;
  if (months === 0) return `${years} ${years === 1 ? 'Year' : 'Years'}`;
  return `${years} ${years === 1 ? 'Year' : 'Years'} ${months} ${months === 1 ? 'Month' : 'Months'}`;
}

/** "Dec 2025" */
export function formatMonthYear(value) {
  return parseDate(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** "Dec 2025 – Present" */
export function formatDateRange(start, end, currentLabel = 'Present') {
  const from = formatMonthYear(start);
  if (!end) return `${from} – ${currentLabel}`;
  return `${from} – ${formatMonthYear(end)}`;
}

/**
 * Merge employment periods so overlapping roles are not counted twice.
 * A role with no end date is treated as running until `now`.
 *
 * @param {Array<{start: string, end?: string}>} periods
 * @param {Date} now
 * @returns {Array<{start: Date, end: Date}>} sorted, non-overlapping ranges
 */
export function mergePeriods(periods = [], now = new Date()) {
  const today = toDay(now);

  const ranges = periods
    .filter((p) => p && p.start)
    .map((p) => {
      const start = toDay(p.start);
      const end = p.end ? toDay(p.end) : today;
      // Guard against a bad end date that precedes the start.
      return { start, end: end < start ? start : end };
    })
    .sort((a, b) => a.start - b.start);

  const merged = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range.start <= last.end) {
      if (range.end > last.end) last.end = range.end;
    } else {
      merged.push({ ...range });
    }
  }
  return merged;
}

/**
 * Total professional experience across all periods, with overlapping roles
 * counted only once.
 *
 * @param {Array<{start: string, end?: string}>} periods
 * @param {Date} now
 * @returns {number} completed months
 */
export function totalExperienceMonths(periods = [], now = new Date()) {
  return mergePeriods(periods, now).reduce(
    (sum, range) => sum + monthsBetween(range.start, range.end),
    0,
  );
}
