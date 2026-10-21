/**
 * Filtering and search helpers for the projects list.
 *
 * Pure functions so they can be unit tested without rendering anything.
 */

/**
 * The distinct categories present in a project list, with counts.
 * @param {Array<{category?: string}>} projects
 * @returns {Array<{id: string, label: string, count: number}>}
 */
export function getCategories(projects = []) {
  const counts = new Map();

  for (const project of projects) {
    if (!project?.category) continue;
    counts.set(project.category, (counts.get(project.category) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([id, count]) => ({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1),
      count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

/**
 * Filter by category and free-text query.
 *
 * The query is matched against the title, summary, technologies and feature
 * list, so searching "mongodb" or "payroll" finds the right project.
 *
 * @param {Array} projects
 * @param {{category?: string, query?: string}} options
 */
export function filterProjects(projects = [], { category = 'all', query = '' } = {}) {
  const needle = query.trim().toLowerCase();

  return projects.filter((project) => {
    if (!project) return false;

    if (category && category !== 'all' && project.category !== category) return false;

    if (!needle) return true;

    const haystack = [
      project.title,
      project.subtitle,
      project.summary,
      project.type,
      project.category,
      ...(project.tags || []),
      ...(project.features || []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(needle);
  });
}

/**
 * Projects in display order — by `order` when present, then by title.
 */
export function sortProjects(projects = []) {
  return [...projects].sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (a.title || '').localeCompare(b.title || '');
  });
}
