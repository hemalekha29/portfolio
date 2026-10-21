import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getCurrentRole,
  getCurrentRoleExperience,
  getExperienceLabel,
  getExperienceSentence,
  getExperienceSummary,
  getRoleDuration,
  getTotalExperience,
} from './experience.js';

const at = (y, m, d) => new Date(y, m - 1, d);

const roles = [
  { id: 'current', company: 'Current Co', start: '2025-12-17', current: true },
  { id: 'past', company: 'Past Co', start: '2024-01-01', end: '2024-12-31' },
];

test('a single current role measures to today', () => {
  const duration = getRoleDuration({ start: '2025-12-17' }, at(2026, 6, 17));
  assert.equal(duration.totalMonths, 6);
  assert.equal(duration.years, 0);
  assert.equal(duration.months, 6);
});

test('a finished role measures to its end date', () => {
  const duration = getRoleDuration({ start: '2024-01-01', end: '2024-12-31' }, at(2026, 1, 1));
  assert.equal(duration.totalMonths, 11);
});

test('a role with no start date measures as zero', () => {
  assert.equal(getRoleDuration({}, at(2026, 1, 1)).totalMonths, 0);
  assert.equal(getRoleDuration(null, at(2026, 1, 1)).totalMonths, 0);
});

test('total experience sums every role', () => {
  const total = getTotalExperience(roles, at(2026, 6, 17));
  // 6 months at the current role + 11 months at the previous one.
  assert.equal(total.totalMonths, 17);
  assert.equal(total.years, 1);
  assert.equal(total.months, 5);
});

test('current role experience is reported separately from the total', () => {
  const current = getCurrentRoleExperience(roles, at(2026, 6, 17));
  assert.equal(current.totalMonths, 6);
  assert.notEqual(current.totalMonths, getTotalExperience(roles, at(2026, 6, 17)).totalMonths);
});

test('getCurrentRole finds the role flagged as current', () => {
  assert.equal(getCurrentRole(roles).id, 'current');
  assert.equal(getCurrentRole([]), null);
});

test('the headline label is derived from the total', () => {
  assert.equal(getExperienceLabel([{ start: '2025-12-17' }], at(2026, 7, 17)), '7 Months Experience');
  assert.equal(getExperienceLabel([{ start: '2025-12-17' }], at(2026, 11, 17)), '11 Months Experience');
  assert.equal(getExperienceLabel([{ start: '2025-12-17' }], at(2026, 12, 17)), '1 Year Experience');
  assert.equal(getExperienceLabel([{ start: '2025-12-17' }], at(2027, 3, 17)), '1 Year 3 Months Experience');
});

test('the headline label is empty-safe', () => {
  assert.equal(getExperienceLabel([], at(2026, 1, 1)), 'Less than a month Experience');
});

test('the summary adapts to the duration', () => {
  assert.deepEqual(getExperienceSummary([{ start: '2025-12-17' }], at(2026, 7, 17)), {
    num: '7+', label: 'Months Exp.',
  });
  assert.deepEqual(getExperienceSummary([{ start: '2025-12-17' }], at(2026, 12, 17)), {
    num: '1+', label: 'Years Exp.',
  });
  assert.deepEqual(getExperienceSummary([{ start: '2025-12-17' }], at(2027, 3, 17)), {
    num: '1Y 3M', label: 'Experience',
  });
});

test('the recruiter sentence distinguishes total from current company', () => {
  const sentence = getExperienceSentence(roles, at(2026, 6, 17));
  // 17 months total, but only 6 of them at the current company.
  assert.match(sentence, /1 Year 5 Months of professional experience/);
  assert.match(sentence, /including 6 Months at Current Co/);
});

test('the recruiter sentence handles having no current role', () => {
  const sentence = getExperienceSentence([{ start: '2024-01-01', end: '2024-12-31' }], at(2026, 1, 1));
  assert.match(sentence, /11 Months of professional experience/);
  assert.doesNotMatch(sentence, /including/);
});

test('a single month reads as "1 Month", not "1 Months"', () => {
  const sentence = getExperienceSentence([{ start: '2026-05-01', current: true }], at(2026, 6, 1));
  assert.match(sentence, /1 Month of professional experience/);
});

test('a single role does not repeat the duration in the sentence', () => {
  // "10 months of experience, including 10 months at X" says the same thing twice.
  const sentence = getExperienceSentence(
    [{ company: 'Current Co', start: '2025-12-17', current: true }],
    at(2026, 6, 17),
  );
  assert.equal(sentence, '6 Months of professional experience.');
  assert.doesNotMatch(sentence, /including/);
});
