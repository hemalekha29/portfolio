import test from 'node:test';
import assert from 'node:assert/strict';
import {
  daysInMonth,
  formatDateRange,
  formatDuration,
  formatMonthYear,
  mergePeriods,
  monthsBetween,
  parseDate,
  splitDuration,
  totalExperienceMonths,
} from './date.js';

const at = (y, m, d) => new Date(y, m - 1, d);

test('parses YYYY-MM-DD as a local date, not UTC', () => {
  const parsed = parseDate('2025-12-17');
  assert.equal(parsed.getFullYear(), 2025);
  assert.equal(parsed.getMonth(), 11);
  assert.equal(parsed.getDate(), 17);
  assert.equal(parsed.getHours(), 0);
});

test('rejects impossible dates instead of rolling them over', () => {
  assert.throws(() => parseDate('2025-02-30'), /Invalid date/);
  assert.throws(() => parseDate('2025-13-01'), /Invalid date/);
  assert.throws(() => parseDate('not-a-date'), /Invalid date/);
  assert.throws(() => parseDate(undefined), /Invalid date/);
});

test('daysInMonth handles leap years', () => {
  assert.equal(daysInMonth(2024, 1), 29); // February 2024
  assert.equal(daysInMonth(2025, 1), 28); // February 2025
  assert.equal(daysInMonth(2025, 0), 31); // January
  assert.equal(daysInMonth(2025, 3), 30); // April
});

test('monthsBetween counts completed months only', () => {
  assert.equal(monthsBetween('2025-12-17', at(2025, 12, 16)), 0);
  assert.equal(monthsBetween('2025-12-17', at(2025, 12, 17)), 0);
  assert.equal(monthsBetween('2025-12-17', at(2025, 12, 18)), 0);
  assert.equal(monthsBetween('2025-12-17', at(2026, 1, 16)), 0);
  assert.equal(monthsBetween('2025-12-17', at(2026, 1, 17)), 1);
  assert.equal(monthsBetween('2025-12-17', at(2026, 1, 18)), 1);
});

test('monthsBetween is not affected by day-count division', () => {
  // 31 Jan -> 28 Feb is one full month even though only 28 days elapsed.
  assert.equal(monthsBetween('2025-01-31', at(2025, 2, 28)), 1);
  assert.equal(monthsBetween('2025-01-31', at(2025, 2, 27)), 0);
  // 30-day month boundary.
  assert.equal(monthsBetween('2025-04-30', at(2025, 5, 30)), 1);
  assert.equal(monthsBetween('2025-04-30', at(2025, 5, 29)), 0);
  // A 90-day span across three 31-day months is still three months.
  assert.equal(monthsBetween('2025-01-01', at(2025, 4, 1)), 3);
});

test('monthsBetween handles leap-year anniversaries', () => {
  // 29 Feb 2024 -> 28 Feb 2025 (non-leap year) is twelve months.
  assert.equal(monthsBetween('2024-02-29', at(2025, 2, 28)), 12);
  // The anniversary is 29 Mar, so 1 Mar is not yet a month.
  assert.equal(monthsBetween('2024-02-29', at(2024, 3, 1)), 0);
  assert.equal(monthsBetween('2024-02-29', at(2024, 3, 29)), 1);
  // A year spanning a leap day is still twelve months.
  assert.equal(monthsBetween('2024-03-15', at(2025, 3, 15)), 12);
});

test('monthsBetween never returns a negative value', () => {
  assert.equal(monthsBetween('2026-05-01', at(2026, 4, 1)), 0);
});

test('splitDuration breaks months into years and months', () => {
  assert.deepEqual(splitDuration(0), { years: 0, months: 0, totalMonths: 0 });
  assert.deepEqual(splitDuration(7), { years: 0, months: 7, totalMonths: 7 });
  assert.deepEqual(splitDuration(12), { years: 1, months: 0, totalMonths: 12 });
  assert.deepEqual(splitDuration(15), { years: 1, months: 3, totalMonths: 15 });
  assert.deepEqual(splitDuration(24), { years: 2, months: 0, totalMonths: 24 });
});

test('formatDuration uses the expected wording', () => {
  assert.equal(formatDuration(0), 'Less than a month');
  assert.equal(formatDuration(1), '1 Month');
  assert.equal(formatDuration(7), '7 Months');
  assert.equal(formatDuration(11), '11 Months');
  assert.equal(formatDuration(12), '1 Year');
  assert.equal(formatDuration(24), '2 Years');
  assert.equal(formatDuration(15), '1 Year 3 Months');
  assert.equal(formatDuration(13), '1 Year 1 Month');
});

test('formatMonthYear and formatDateRange', () => {
  assert.equal(formatMonthYear('2025-12-17'), 'Dec 2025');
  assert.equal(formatDateRange('2025-12-17', null), 'Dec 2025 – Present');
  assert.equal(formatDateRange('2025-12-17', '2026-06-30'), 'Dec 2025 – Jun 2026');
});

test('mergePeriods combines overlapping roles so time is not double counted', () => {
  const merged = mergePeriods(
    [
      { start: '2024-01-01', end: '2024-12-31' },
      { start: '2024-06-01', end: '2025-05-31' },
    ],
    at(2026, 1, 1),
  );
  assert.equal(merged.length, 1);
  assert.equal(merged[0].start.getFullYear(), 2024);
  assert.equal(merged[0].end.getFullYear(), 2025);
});

test('mergePeriods keeps separate, non-overlapping roles apart', () => {
  const merged = mergePeriods(
    [
      { start: '2020-01-01', end: '2020-12-31' },
      { start: '2022-01-01', end: '2022-12-31' },
    ],
    at(2026, 1, 1),
  );
  assert.equal(merged.length, 2);
});

test('mergePeriods treats a role with no end date as running until now', () => {
  const merged = mergePeriods([{ start: '2025-12-17' }], at(2026, 6, 1));
  assert.equal(merged.length, 1);
  assert.equal(merged[0].end.getFullYear(), 2026);
  assert.equal(merged[0].end.getMonth(), 5);
});

test('mergePeriods guards against an end date before the start date', () => {
  const merged = mergePeriods([{ start: '2025-06-01', end: '2025-01-01' }], at(2026, 1, 1));
  assert.equal(merged.length, 1);
  assert.equal(merged[0].end.getTime(), merged[0].start.getTime());
});

test('totalExperienceMonths sums distinct roles', () => {
  const total = totalExperienceMonths(
    [
      { start: '2024-01-01', end: '2024-12-31' }, // 11 months
      { start: '2025-01-01', end: '2025-11-30' }, // 10 months
    ],
    at(2026, 1, 1),
  );
  assert.equal(total, 21);
});

test('totalExperienceMonths does not double count overlapping roles', () => {
  const total = totalExperienceMonths(
    [
      { start: '2024-01-01', end: '2024-12-31' }, // 11 months
      { start: '2024-06-01', end: '2025-05-31' }, // fully contained
    ],
    at(2026, 1, 1),
  );
  // Merged into one continuous range: 2024-01-01 -> 2025-05-31 = 16 months.
  assert.equal(total, 16);
});

test('totalExperienceMonths handles an empty list', () => {
  assert.equal(totalExperienceMonths([], at(2026, 1, 1)), 0);
  assert.equal(totalExperienceMonths(undefined, at(2026, 1, 1)), 0);
});
