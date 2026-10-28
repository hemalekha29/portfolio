/**
 * Selected public repositories.
 *
 * Every entry here was read from the public GitHub profile — the
 * description states what the repository actually contains, and the stack
 * is taken from the repository's own `package.json` rather than guessed
 * from the name. Repositories that are empty, private, or that duplicate
 * an entry above are left out on purpose: a strip of dead links is worse
 * than a short one.
 *
 * Each entry stores the repository *name*; the URL is built from the
 * account in `data/github.js`. With no account configured every URL is
 * null and the section hides itself rather than linking to nowhere.
 */

import { githubPagesUrl, githubRepoUrl } from './github.js';

const entries = [
  {
    id: 'portfolio',
    name: 'portfolio',
    repo: 'portfolio',
    description:
      'This site — a React 19 and Vite portfolio with a dark, code-inspired theme. Content lives in data files; the components only render it.',
    language: 'JavaScript',
    stack: ['React', 'Vite', 'CSS'],
    demo: 'https://portfolio-eight-sage-42.vercel.app',
  },
  {
    id: 'flow-frontend',
    name: 'todo',
    repo: 'todo',
    description:
      'The Flow frontend — a React and TypeScript task application with an inbox, a Today view, recurring tasks, a calendar and a dashboard, backed by TanStack Query.',
    language: 'TypeScript',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Zod'],
    demo: 'https://todo-beige-delta-46.vercel.app',
  },
  {
    id: 'flow-backend',
    name: 'todobackend',
    repo: 'todobackend',
    description:
      'The Flow API — Express and TypeScript with Mongoose, JWT in httpOnly cookies, Zod request validation, rate limiting and a Jest-style integration suite.',
    language: 'TypeScript',
    stack: ['Node.js', 'Express', 'TypeScript', 'MongoDB'],
  },
  {
    id: 'subwikhashub',
    name: 'subwikhashub',
    repo: 'subwikhashub',
    description:
      'A gifting storefront — catalogue, cart, Razorpay checkout and order tracking on Firebase, with a static prerender step that emits crawlable HTML for every route.',
    language: 'JavaScript',
    stack: ['React', 'Firebase', 'Razorpay', 'Vercel'],
    demo: 'https://subwikhahub.vercel.app',
  },
  {
    id: 'period-tracker',
    name: 'periodTracker',
    repo: 'periodTracker',
    description:
      'A cycle-tracking web app with calendar views and cycle trend charts, using passkey sign-in and React Bootstrap.',
    language: 'JavaScript',
    stack: ['React', 'Recharts', 'Bootstrap', 'SimpleWebAuthn'],
    demo: 'https://period-tracker-puce-zeta.vercel.app',
  },
  {
    id: 'period-tracker-api',
    name: 'periodTracker_backend',
    repo: 'periodTracker_backend',
    description:
      'The cycle-tracker API — Express with Mongoose, JWT sessions, Google sign-in, passkey verification, and integration tests run against an in-memory MongoDB.',
    language: 'JavaScript',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    id: 'mini-social',
    name: 'mini_social_media',
    repo: 'mini_social_media',
    description:
      'A small social feed built to learn routing and reusable component structure — profiles, posts and a feed, published to GitHub Pages.',
    language: 'JavaScript',
    stack: ['React', 'React Router', 'Bootstrap'],
    /* Published to GitHub Pages, so its address follows the account. */
    pages: true,
  },
];

/** The repositories, with their URLs resolved against the account. */
export const repositories = entries.map((entry) => ({
  ...entry,
  url: githubRepoUrl(entry.repo),
  demo: entry.pages ? githubPagesUrl(entry.repo) : entry.demo,
}));

export default repositories;
