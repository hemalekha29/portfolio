import { useEffect } from 'react';
import { profile } from '../../data/profile';
import { buildPersonSchema } from '../../utils/seoSchema';

/**
 * Keeps the document metadata in sync with `src/data/profile.js`.
 *
 * The static `index.html` carries the same values so crawlers that do not
 * execute JavaScript still see them; this keeps the two from drifting when
 * the profile changes.
 */
function setMeta(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }
  for (const [key, value] of Object.entries(attrs)) {
    tag.setAttribute(key, value);
  }
}

export default function SeoManager() {
  useEffect(() => {
    const { seo } = profile;
    const url = seo.url ? `${seo.url.replace(/\/$/, '')}/` : undefined;

    document.title = seo.title;

    setMeta('meta[name="description"]', { name: 'description', content: seo.description });

    setMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: seo.image });
    if (url) setMeta('meta[property="og:url"]', { property: 'og:url', content: url });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seo.image });
    if (seo.twitter) setMeta('meta[name="twitter:site"]', { name: 'twitter:site', content: seo.twitter });

    if (url) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    }

    /* Structured data. `index.html` ships the same graph as static JSON-LD
       for crawlers that do not run JavaScript; this replaces it with the
       values generated from the profile, so the two stay identical. */
    const schema = buildPersonSchema();
    let ld = document.head.querySelector('script[type="application/ld+json"]');
    if (!ld) {
      ld = document.createElement('script');
      ld.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(schema);
  }, []);

  return null;
}
