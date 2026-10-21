/**
 * Experience calculations over employment records.
 *
 * Two different numbers matter to a recruiter, and they are not the same:
 *
 *   - **Total professional experience** — every role summed, with overlapping
 *     periods counted once. This is what "10 Months Experience" means.
 *   - **Experience at the current company** — just the current role. Useful in
 *     context, but it would overstate total experience if it were the
 *     headline number.
 *
 * This module is pure: pass `now` in to make it deterministic under test.
 */

import {
  formatDuration,
  monthsBetween,
  splitDuration,
  totalExperienceMonths,
} from './date.js';

/**
 * Duration of a single employment record.
 * @param {{start: string, end?: string}} role
 * @param {Date} now
 */
export function getRoleDuration(role, now = new Date()) {
  if (!role || !role.start) return splitDuration(0);
  return splitDuration(monthsBetween(role.start, role.end || now));
}

/**
 * Total professional experience across every role.
 * @param {Array<{start: string, end?: string}>} roles
 * @param {Date} now
 */
export function getTotalExperience(roles = [], now = new Date()) {
  return splitDuration(totalExperienceMonths(roles, now));
}

/**
 * The role flagged as current.
 * @param {Array<{current?: boolean}>} roles
 */
export const getCurrentRole = (roles = []) => roles.find((r) => r.current) || null;

/**
 * Experience at the current company only.
 * @param {Array<{current?: boolean, start: string, end?: string}>} roles
 * @param {Date} now
 */
export function getCurrentRoleExperience(roles = [], now = new Date()) {
  const current = getCurrentRole(roles);
  return current ? getRoleDuration(current, now) : splitDuration(0);
}

/**
 * The headline label used across the hero, about and recruiter summary.
 * @param {Array<{start: string, end?: string}>} roles
 * @param {Date} now
 * @returns {string} e.g. "10 Months Experience"
 */
export function getExperienceLabel(roles = [], now = new Date()) {
  const { totalMonths } = getTotalExperience(roles, now);
  return `${formatDuration(totalMonths)} Experience`;
}

/**
 * Compact form for the hero stat card.
 * @returns {{ num: string, label: string }}
 */
export function getExperienceSummary(roles = [], now = new Date()) {
  const { years, months, totalMonths } = getTotalExperience(roles, now);

  if (years === 0) return { num: `${totalMonths}+`, label: 'Months Exp.' };
  if (months === 0) return { num: `${years}+`, label: 'Years Exp.' };
  return { num: `${years}Y ${months}M`, label: 'Experience' };
}

/**
 * A short sentence describing where the experience sits, used in the
 * recruiter summary. Avoids claiming more than the dates support.
 */
export function getExperienceSentence(roles = [], now = new Date()) {
  const total = getTotalExperience(roles, now);
  const current = getCurrentRoleExperience(roles, now);
  const currentRole = getCurrentRole(roles);

  const totalText = formatDuration(total.totalMonths);

  // Only mention the current company when it is a meaningful part of the
  // total — otherwise "10 months of experience, including 10 months at X"
  // says the same thing twice.
  if (!currentRole || current.totalMonths >= total.totalMonths) {
    return `${totalText} of professional experience.`;
  }

  const atCurrent = formatDuration(current.totalMonths);
  return `${totalText} of professional experience, including ${atCurrent} at ${currentRole.company}.`;
}
