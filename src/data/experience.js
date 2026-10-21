/**
 * Employment records.
 *
 * This is the single source of truth for work history and the only place
 * employment dates are defined. Dates are 'YYYY-MM-DD' strings.
 *
 * `current: true` marks the role in progress. `end` is omitted for a current
 * role — the duration is then measured to today.
 *
 * A role that is not current but whose end date is in the future is treated
 * as ending today, so a mis-entered future date cannot inflate experience.
 */

export const employment = [
  {
    id: 'eethal-nad-it-solutions',
    company: 'Eethal Nad IT Solutions',
    title: 'MERN Stack Developer',
    location: 'Coimbatore, India',
    type: 'Full-time',
    start: '2025-12-17',
    current: true,
    color: '#00d4ff',
    summary:
      'Building and maintaining healthcare, practice-management and HR platforms — scheduling engines, permission systems, payroll and AI-assisted workflows.',
    responsibilities: [
      'Developed full-stack features in React and Express across a clinic management platform covering leads, patient records and appointment scheduling',
      'Designed the scheduling model so concurrent requests cannot double-book a slot, enforcing the constraint in the database rather than at the application layer',
      'Implemented two-factor authentication and a permission-based access system spanning 37 modules, with role and branch scoped data access',
      'Integrated third-party services including WATI WhatsApp, IVR call logs, payment processing and Zoom and Microsoft Teams video consultations',
      'Built AI-assisted capabilities: call transcription, quality scoring against evidence, and a booking assistant that requires human confirmation before acting',
      'Debugged and optimised production issues across background jobs and scheduled reporting, improving the reliability of recurring tasks',
      'Collaborated with the team on requirement gathering, code review and delivery across multiple releases',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
  },
  {
    id: 'favor-web-development',
    company: 'Favor Web Development',
    title: 'Frontend Development Intern',
    location: 'Virudhunagar, India',
    type: 'Internship',
    // Exact dates for this internship have not been confirmed yet. Until they
    // are, `periodLabel` is what the timeline displays and this role is
    // excluded from the experience calculation, so the headline figure stays
    // conservative rather than overstating it.
    start: null,
    end: null,
    periodLabel: '2025',
    datesPending: true,
    color: '#7c3aed',
    summary:
      'Frontend development internship focused on reusable React components and REST API integration.',
    responsibilities: [
      'Developed responsive web interfaces using React.js and JavaScript',
      'Built reusable React.js components and integrated them with REST APIs',
      'Refactored existing screens to improve load performance and usability',
      'Collaborated with the design and backend teams on interface enhancements',
    ],
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
];

export default employment;
