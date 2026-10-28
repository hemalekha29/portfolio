/**
 * Brand colours for the technologies shown in the architecture navigator.
 *
 * The MERN navigator is built from each project's real technology list, so it
 * needs a colour per technology. Anything not listed falls back to the
 * portfolio's cyan accent.
 */

export const techColors = {
  React: '#61dafb',
  'React.js': '#61dafb',
  'Next.js': '#ffffff',
  Express: '#ffffff',
  'Express.js': '#ffffff',
  'Node.js': '#8cc84b',
  MongoDB: '#47a248',
  Mongoose: '#880000',
  PostgreSQL: '#336791',
  Prisma: '#7c8ea3',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  'Tailwind CSS': '#38bdf8',
  Tailwind: '#38bdf8',
  Docker: '#2496ed',
  Redis: '#dc382d',
  'Socket.IO': '#e8e8e8',
  Firebase: '#ffca28',
  Vercel: '#ffffff',
  Razorpay: '#3395ff',
  Cloudinary: '#3448c5',
  'Three.js': '#ffffff',
  'Framer Motion': '#ff5c1b',
  'Claude AI': '#d97757',
  'Agentic AI': '#f72585',
  RAG: '#06ffa5',
  Git: '#f05033',
  GitHub: '#e2e8f0',
  Postman: '#ff6c37',
  'REST APIs': '#06ffa5',
};

export const DEFAULT_TECH_COLOR = '#00d4ff';

/** The brand colour for a technology, or the fallback accent. */
export const techColor = (name) => techColors[name] || DEFAULT_TECH_COLOR;

export default techColors;
