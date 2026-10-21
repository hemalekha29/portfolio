import { useEffect, useState } from 'react';
import { employment } from '../data/experience';
import {
  getCurrentRoleExperience,
  getExperienceLabel,
  getExperienceSentence,
  getExperienceSummary,
  getTotalExperience,
} from '../utils/experience';

/**
 * Experience values derived from the configured employment dates.
 *
 * Re-renders when the calendar day rolls over, so a page left open overnight
 * picks up the new duration without a reload. A single timeout is scheduled
 * until the next local midnight, then re-armed — cheaper and more reliable
 * than polling.
 *
 * @param {Array} records employment records; defaults to the configured ones
 */
export function useExperience(records = employment) {
  const read = () => ({
    total: getTotalExperience(records),
    current: getCurrentRoleExperience(records),
    label: getExperienceLabel(records),
    summary: getExperienceSummary(records),
    sentence: getExperienceSentence(records),
  });

  const [experience, setExperience] = useState(read);

  useEffect(() => {
    let timeout;

    const schedule = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timeout = setTimeout(() => {
        setExperience(read());
        schedule();
      }, nextMidnight.getTime() - now.getTime());
    };

    schedule();
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records]);

  return experience;
}
