/**
 * Selected public repositories.
 *
 * Every entry here was read from the public `hemalekha29` GitHub profile —
 * the description states what the repository actually contains, and the
 * stack is taken from the repository's own `package.json` rather than
 * guessed from the name. Repositories that are empty, private, or that
 * duplicate an entry above are left out on purpose: a strip of dead links
 * is worse than a short one.
 */

export const repositories = [
  {
    id: 'portfolio',
    name: 'portfolio',
    description:
      'This site — a React 19 and Vite portfolio with a dark, code-inspired theme. Content lives in data files; the components only render it.',
    language: 'JavaScript',
    url: 'https://github.com/hemalekha29/portfolio',
    demo: 'https://portfolio-eight-sage-42.vercel.app',
    stack: ['React', 'Vite', 'CSS'],
  },
  {
    id: 'flow-frontend',
    name: 'todo',
    description:
      'The Flow frontend — a React and TypeScript task application with an inbox, a Today view, recurring tasks, a calendar and a dashboard, backed by TanStack Query.',
    language: 'TypeScript',
    url: 'https://github.com/hemalekha29/todo',
    demo: 'https://todo-beige-delta-46.vercel.app',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Zod'],
  },
  {
    id: 'flow-backend',
    name: 'todobackend',
    description:
      'The Flow API — Express and TypeScript with Mongoose, JWT in httpOnly cookies, Zod request validation, rate limiting and a Jest-style integration suite.',
    language: 'TypeScript',
    url: 'https://github.com/hemalekha29/todobackend',
    stack: ['Node.js', 'Express', 'TypeScript', 'MongoDB'],
  },
  {
    id: 'subwikhashub',
    name: 'subwikhashub',
    description:
      'A gifting storefront — catalogue, cart, Razorpay checkout and order tracking on Firebase, with a static prerender step that emits crawlable HTML for every route.',
    language: 'JavaScript',
    url: 'https://github.com/hemalekha29/subwikhashub',
    demo: 'https://subwikhahub.vercel.app',
    stack: ['React', 'Firebase', 'Razorpay', 'Vercel'],
  },
  {
    id: 'period-tracker',
    name: 'periodTracker',
    description:
      'A cycle-tracking web app with calendar views and cycle trend charts, using passkey sign-in and React Bootstrap.',
    language: 'JavaScript',
    url: 'https://github.com/hemalekha29/periodTracker',
    demo: 'https://period-tracker-puce-zeta.vercel.app',
    stack: ['React', 'Recharts', 'Bootstrap', 'SimpleWebAuthn'],
  },
  {
    id: 'period-tracker-api',
    name: 'periodTracker_backend',
    description:
      'The cycle-tracker API — Express with Mongoose, JWT sessions, Google sign-in, passkey verification, and integration tests run against an in-memory MongoDB.',
    language: 'JavaScript',
    url: 'https://github.com/hemalekha29/periodTracker_backend',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    id: 'mini-social',
    name: 'mini_social_media',
    description:
      'A small social feed built to learn routing and reusable component structure — profiles, posts and a feed, published to GitHub Pages.',
    language: 'JavaScript',
    url: 'https://github.com/hemalekha29/mini_social_media',
    demo: 'https://hemalekha29.github.io/mini_social_media/',
    stack: ['React', 'React Router', 'Bootstrap'],
  },
];

/** Where the strip links to. */
export const githubProfileUrl = 'https://github.com/hemalekha29';

export default repositories;
