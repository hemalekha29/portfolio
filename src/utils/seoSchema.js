/**
 * Structured data for search engines.
 *
 * The `Person` schema is built from `profile.js` so the JSON-LD can never
 * drift from the content shown on the page. The same object is written into
 * `index.html` as static JSON-LD for crawlers that do not execute
 * JavaScript — `seoSchema.test.js` compares the two, so the static copy
 * cannot silently fall behind.
 */

import { profile } from '../data/profile.js';
import { SOCIAL_URLS } from '../data/socialUrls.js';

/** Strip a trailing slash so paths can be appended safely. */
const originOf = (url) => (url ? url.replace(/\/+$/, '') : '');

/**
 * Resolve a site-relative asset path against the configured origin.
 * Absolute URLs are passed through untouched.
 */
const absoluteUrl = (origin, path) => {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return origin ? `${origin}${path.startsWith('/') ? '' : '/'}${path}` : path;
};

/**
 * Build the schema.org `Person` graph for the site owner.
 *
 * @param {object} [options]
 * @param {object} [options.profile] profile configuration
 * @param {object} [options.urls] social URLs
 * @returns {object} a schema.org node
 */
export function buildPersonSchema({
  profile: p = profile,
  urls = SOCIAL_URLS,
} = {}) {
  const origin = originOf(p.seo?.url);

  const [locality, region] = String(p.location || '')
    .split(',')
    .map((part) => part.trim());

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    jobTitle: p.title,
    url: origin ? `${origin}/` : undefined,
    description: p.summary,
    image: absoluteUrl(origin, p.seo?.image || p.image),
    email: p.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality || undefined,
      addressRegion: region || undefined,
    },
    sameAs: [urls.github, urls.linkedin].filter(Boolean),
    worksFor: {
      '@type': 'Organization',
      name: p.currentCompany?.name,
      url: p.currentCompany?.url,
    },
    knowsAbout: p.stack || [],
  };

  // Drop undefined members so the emitted JSON stays clean.
  return JSON.parse(JSON.stringify(schema));
}

export default buildPersonSchema;
