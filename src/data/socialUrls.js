/**
 * Canonical URLs for the profile's social accounts.
 *
 * These live in a plain `.js` file (rather than next to the icons in
 * `socialLinks.jsx`) so that both the React components and the pure
 * utilities — including the SEO schema builder and its tests — can read
 * them without pulling JSX into a Node process.
 *
 * The GitHub URL is derived from `data/github.js`, and is null while no
 * account is configured. Anything that renders a link checks for that.
 *
 * A URL is defined exactly once, here.
 */

import { githubProfileUrl } from './github.js';

export const SOCIAL_URLS = {
  github: githubProfileUrl(),
  linkedin: 'https://www.linkedin.com/in/hema-lekha-s-91521825b',
  email: 'mailto:hemalekha4@gmail.com',
  phone: 'tel:+916374852487',
};

export default SOCIAL_URLS;
