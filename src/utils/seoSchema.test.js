import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildPersonSchema } from './seoSchema.js';
import { profile } from '../data/profile.js';
import { SOCIAL_URLS } from '../data/socialUrls.js';

const indexHtml = readFileSync(
  fileURLToPath(new URL('../../index.html', import.meta.url)),
  'utf8',
);

/** Pull the static JSON-LD block out of index.html. */
const staticJsonLd = () => {
  const match = indexHtml.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(match, 'index.html carries a static JSON-LD block');
  return JSON.parse(match[1]);
};

/** Read the content of a meta tag out of index.html. */
const metaContent = (selector) => {
  const match = indexHtml.match(new RegExp(`<meta ${selector} content="([^"]*)"`));
  return match ? match[1] : null;
};

test('the schema describes a person with the profile details', () => {
  const schema = buildPersonSchema();
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'Person');
  assert.equal(schema.name, profile.name);
  assert.equal(schema.jobTitle, profile.title);
  assert.equal(schema.email, profile.email);
  assert.equal(schema.description, profile.summary);
});

test('the schema points at the site origin', () => {
  const schema = buildPersonSchema();
  assert.equal(schema.url, 'https://hemalekha.dev/');
  assert.equal(schema.image, 'https://hemalekha.dev/images/og-image.jpg');
});

test('the schema locates the site owner', () => {
  const { address } = buildPersonSchema();
  assert.equal(address['@type'], 'PostalAddress');
  assert.equal(address.addressLocality, 'Coimbatore');
  assert.equal(address.addressRegion, 'India');
});

test('the schema links the social profiles', () => {
  const { sameAs } = buildPersonSchema();
  assert.deepEqual(sameAs, [SOCIAL_URLS.github, SOCIAL_URLS.linkedin].filter(Boolean));
});

test('the schema never publishes an empty profile link', () => {
  for (const link of buildPersonSchema().sameAs) {
    assert.ok(link, 'a sameAs entry must not be empty');
    assert.match(link, /^https:\/\//, 'a sameAs entry must be an absolute URL');
  }
});

test('the schema names the current employer', () => {
  const { worksFor } = buildPersonSchema();
  assert.equal(worksFor['@type'], 'Organization');
  assert.equal(worksFor.name, profile.currentCompany.name);
  assert.equal(worksFor.url, profile.currentCompany.url);
});

test('the schema lists the technologies', () => {
  assert.deepEqual(buildPersonSchema().knowsAbout, profile.stack);
});

test('the static JSON-LD in index.html matches the generated schema', () => {
  /* The static block lists only the always-published accounts; the GitHub
     account is added at runtime, so changing it never needs an edit to
     index.html. Compare against the schema without it. */
  assert.deepEqual(
    staticJsonLd(),
    buildPersonSchema({ urls: { ...SOCIAL_URLS, github: null } }),
  );
});

test('the static JSON-LD publishes no account that is not configured', () => {
  for (const link of staticJsonLd().sameAs) {
    assert.ok(link, 'a sameAs entry must not be empty');
  }
});

test('the meta description in index.html matches the profile', () => {
  assert.equal(metaContent('name="description"'), profile.seo.description);
});

test('the canonical link and og:url agree', () => {
  const canonical = indexHtml.match(/<link rel="canonical" href="([^"]*)"/);
  const ogUrl = metaContent('property="og:url"');
  assert.ok(canonical, 'index.html carries a canonical link');
  assert.equal(canonical[1], ogUrl);
});

test('the page title in index.html matches the profile', () => {
  const title = indexHtml.match(/<title>([^<]*)<\/title>/);
  assert.ok(title);
  assert.equal(title[1], profile.seo.title);
});
