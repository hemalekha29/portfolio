/**
 * Navigation items — used by the navbar, the mobile drawer and the footer.
 * `to` is the scroll target id, which must match a section's `id` attribute.
 */

export const navigation = [
  { id: 'hero', to: 'hero', label: '_init()', title: 'Home' },
  { id: 'about', to: 'about', label: 'about.me', title: 'About' },
  { id: 'skills', to: 'skills', label: 'skills[]', title: 'Skills' },
  { id: 'experience', to: 'experience', label: './experience', title: 'Experience' },
  { id: 'projects', to: 'projects', label: 'projects{}', title: 'Projects' },
  { id: 'repositories', to: 'repositories', label: 'git.repositories', title: 'Open Source' },
  { id: 'education', to: 'education', label: 'education()', title: 'Education' },
  { id: 'contact', to: 'contact', label: 'hire_me()', title: 'Contact' },
];

export default navigation;
