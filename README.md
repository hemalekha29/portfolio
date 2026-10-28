# Hemalekha S — Portfolio

A personal portfolio built with **React 19 + Vite**. Dark, code-inspired theme with a
glassmorphism card system, scroll-triggered animations, and a colour system driven by
CSS custom properties.

```bash
npm install
npm run dev       # dev server
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # eslint
npm test          # unit tests (node:test)
```

---

## Architecture

Content lives in `src/data/`; components render it. Nothing about *what* you
have built is hardcoded inside a JSX component.

```
src/
├── components/
│   ├── layout/        Navbar, Footer
│   ├── sections/      Hero, About, Skills, Experience, Projects,
│   │                  Repositories, Education, Certifications, Contact
│   ├── shared/        SeoManager, devcursor/ (the WebGL cursor)
│   └── ui/            SectionHeader, ProjectCard, ProjectDetail, EmptyState
├── config/            emailjs.js — third-party configuration
├── data/              profile, experience, education, projects, skills,
│                      socialLinks, socialUrls, navigation, certifications,
│                      repositories, codeTokens, techColors
├── hooks/             useExperience
├── pages/             NotFound
├── styles/            one stylesheet per section
└── utils/             date.js, experience.js, filters.js, seoSchema.js,
                       flowGeometry.js, tokenPool.js (+ tests)
```

**Layers.** `data` holds what the site says. `utils` holds pure logic (date
math, filtering) and is unit-tested. `components` render. `config` holds
third-party settings. Content, logic and presentation never mix.

---

## Updating your details

**Everything personal lives in `src/data/profile.js`** — name, title, summary,
email, resume path, availability, SEO metadata, and the `currentRoleId` that
points at your current job in `data/experience.js`.

Change one value and it updates across the hero, about, contact and footer.

### The two photographs

The site uses two different photographs, each in the frame that suits it, so
no image appears twice:

| File | Used by | Shape |
|---|---|---|
| `public/images/hemzz-profile.jpg` | the **hero** — a studio portrait | 3:4 portrait, in a 320×380 frame |
| `public/images/developer-working.webp` | the **about** section — a developer workspace | 16:9 landscape, in a 16:9 frame |
| `public/images/og-image.jpg` | social preview only — not shown on the page | 1200×630 |

`profile.js` holds all three paths (`image`, `workspaceImage`, `seo.image`).
The About frame sets `height: auto` alongside `aspect-ratio: 16 / 9` — without
it, the `<img>` height attribute becomes a real height and the photograph is
cropped into a narrow portrait.

### Add or edit a project — `src/data/projects.jsx`

```js
{
  num: '06',
  slug: 'my-project',              // stable id, used for anchors
  title: 'My Project',
  subtitle: 'Short descriptor shown above the title',
  summary: 'One or two sentences for the card.',
  problem: 'What problem it solved.',
  contribution: 'What you specifically built.',
  features: ['Feature one', 'Feature two'],
  challenges: [{ title: 'A hard problem', detail: 'How you solved it.' }],
  architecture: ['Line one', 'Line two'],   // rendered in a code panel
  tags: ['React', 'Node.js'],               // must exist in techIcons
  category: 'healthcare',                    // drives the filter chips
  type: 'client',                            // in-house | client | personal
  featured: true,
  order: 6,
  status: 'In production',
  period: 'Client project',
  color: '#00d4ff',
  gradient: 'linear-gradient(135deg, ...)',
  thumbnail: null,                            // or '/images/shot.jpg'
  github: null,                               // null hides the icon
  demo: null,
  privateRepo: true,                          // shows a lock instead of a link
  scale: '78 data models · 367 API endpoints',
}
```

No component changes are needed — the card, the detail panel, the filter chips
and the search index all read from the same record. `github: null` and
`demo: null` hide the buttons rather than showing a broken link.

### Add a skill — `src/data/skills.jsx`

Add an entry to the relevant category's `skills` array with a `proficiency`
line. Skills use descriptive text rather than percentage bars, because
"React 85%" communicates nothing a recruiter can verify.

### Add a certification — `src/data/certifications.js`

```js
{ id: 'aws-cp', name: 'AWS Certified', issuer: 'Amazon Web Services', issued: '2025-06-01' }
```

The Certifications section renders itself as soon as the list is non-empty, and
stays hidden while it is empty.

### Add a job — `src/data/experience.js`

```js
{
  id: 'my-company', company: 'My Company', title: 'MERN Stack Developer',
  start: '2025-12-17',   // 'YYYY-MM-DD'
  end: null,             // omit for a current role
  current: true,         // exactly one record should have this
  responsibilities: ['What you did.'],
  technologies: ['React', 'Node.js'],
}
```

---

## How the experience figure is calculated

`src/utils/date.js` counts **completed calendar months** by comparing
year/month/day fields — never by dividing days by 30. That means month lengths
(28/29/30/31) and leap years are handled exactly, and a 31 January start
reaches its one-month mark on 28 February rather than 3 March.

Dates are stored as `'YYYY-MM-DD'` and parsed as **local** calendar dates.
`new Date('2025-12-17')` is parsed as UTC midnight by JavaScript, which shifts
the day backwards in negative-offset timezones — so `parseDate()` builds the
date from its parts instead.

Two different numbers are reported, and they are not the same:

- **Total professional experience** — every role summed, with overlapping
  periods merged first so concurrent roles are never double counted
  (`mergePeriods` → `totalExperienceMonths`).
- **Experience at the current company** — the current role only
  (`getCurrentRoleExperience`).

The headline figure in the hero, about and recruiter summary is the **total**.
`useExperience` re-renders at the next local midnight, so a page left open
overnight picks up the new duration without a reload.

```js
import { getExperienceLabel } from './utils/experience.js';
getExperienceLabel(employment, new Date()); // → "1 Year 1 Month Experience"
```

---

## Content updates and deployment

All content is **build-time**. Editing a file in `src/data/` requires a
rebuild and redeploy to appear on the live site — there is no runtime CMS and
no content database. `SeoManager` keeps the in-page metadata in sync with
`profile.js` at runtime, and `index.html` carries the same values statically so
crawlers that do not run JavaScript still see them.

---

## Testing

```bash
npm test
```

102 tests covering:

- `src/utils/date.test.js` — month arithmetic, leap years, end-of-month
  anniversaries, invalid dates, merging overlapping periods
- `src/utils/experience.test.js` — total vs. current-role duration, labels,
  summaries, recruiter sentence
- `src/utils/filters.test.js` — category and engagement-type filtering,
  faceted counts, search, empty input
- `src/utils/seoSchema.test.js` — the JSON-LD `Person` graph, and a check
  that the static copy in `index.html` still matches the generated one
- `src/utils/flowGeometry.test.js` — the architecture-navigator layout
- `src/utils/tokenPool.test.js` — the code-stream token pool
- `src/components/shared/devcursor/glyphAtlas.test.js` — glyph packing
- `src/data/data.test.js` — content integrity (required fields, unique ids,
  valid and ordered dates, exactly one current role, total across all roles)

---

## Third-party configuration

EmailJS settings live in `src/config/emailjs.js` and can be overridden with
build-time environment variables:

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Only public identifiers belong in frontend code — the EmailJS public key is
designed to be shipped to the browser. No private key, database credential or
admin endpoint belongs in this repository.
