/**
 * Certifications.
 *
 * Verified credentials. Add a record here and the Certifications section
 * renders automatically — no component changes needed. The section stays
 * hidden while this list is empty.
 *
 * Certificate images live in `public/images/certificates/` and are served
 * from the site root. The filenames below match the file names to drop in:
 *
 *   public/images/certificates/agentic-ai-fundamentals.jpg
 *   public/images/certificates/claude-code-101.jpg
 *   public/images/certificates/docker-getting-started.jpg
 *   public/images/certificates/mern-full-stack.jpg
 *
 * If an image is missing the card falls back to its award icon, so it never
 * renders as a broken image.
 *
 * Shape:
 *   {
 *     id: 'unique-id',
 *     name: 'Certification name',
 *     issuer: 'Issuing organisation',
 *     issued: 'YYYY-MM-DD',        // optional
 *     credentialUrl: 'https://...', // optional
 *     credentialId: 'certificate code', // optional
 *     image: '/images/certificates/x.jpg', // optional
 *     color: '#00d4ff',             // optional
 *   }
 */

export const certifications = [
  {
    id: 'agentic-ai-fundamentals',
    name: 'Agentic AI Fundamentals',
    issuer: 'Hugging Face Agents Course — Unit 1: Foundations of Agents',
    issued: '2026-10-05',
    image: '/images/certificates/agentic-ai-fundamentals.jpg',
    color: '#f72585',
  },
  {
    id: 'claude-code-101',
    name: 'Claude Code 101',
    issuer: 'Anthropic Academy',
    image: '/images/certificates/claude-code-101.jpg',
    color: '#d97757',
  },
  {
    id: 'docker-getting-started',
    name: 'Getting Started with Docker',
    issuer: 'Simplilearn',
    issued: '2026-09-09',
    credentialId: '10711980',
    image: '/images/certificates/docker-getting-started.jpg',
    color: '#00d4ff',
  },
  {
    id: 'mern-full-stack',
    name: 'MERN Full Stack Course',
    issuer: 'Bluekode Academy',
    issued: '2025-11-30',
    image: '/images/certificates/mern-full-stack.jpg',
    color: '#06ffa5',
  },
];

export default certifications;
