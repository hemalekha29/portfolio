/**
 * Barrel for the content data layer.
 *
 * Import from '@/data' rather than reaching into individual files, so the
 * content model stays in one obvious place.
 */

export { default as profile } from './profile.js';
export { default as employment, employment as employmentRecords } from './experience.js';
export { default as education } from './education.js';
export { default as certifications } from './certifications.js';
export { default as socialLinks, getSocialLink } from './socialLinks.jsx';
export { default as navigation } from './navigation.js';
export { projects, techIcons } from './projects.jsx';
export { categories, skillCategories, allSkills, techCount, getCategory } from './skills.jsx';
