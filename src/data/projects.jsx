import {
  SiReact, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiTailwindcss, SiJavascript, SiDocker, SiSocketdotio, SiFirebase, SiVercel,
  SiRazorpay, SiCloudinary, SiThreedotjs, SiFramer, SiRedis,
} from 'react-icons/si';
import { FiZap } from 'react-icons/fi';
import { githubRepoUrl } from './github.js';

/**
 * Portfolio projects.
 *
 * Confidentiality note: projects marked `privateRepo: true` belong to client work.
 * Their repositories are private, so no URL is shown — linking to them would be
 * a dead link for recruiters anyway. Client names are not disclosed.
 */

export const techIcons = {
  React: <SiReact />,
  TypeScript: <SiTypescript />,
  'Next.js': <SiNodedotjs />,
  'Node.js': <SiNodedotjs />,
  Express: <SiExpress />,
  PostgreSQL: <SiPostgresql />,
  MongoDB: <SiMongodb />,
  Tailwind: <SiTailwindcss />,
  JavaScript: <SiJavascript />,
  Docker: <SiDocker />,
  'Socket.IO': <SiSocketdotio />,
  Redis: <SiRedis />,
  'Claude AI': <FiZap />,
  Firebase: <SiFirebase />,
  Vercel: <SiVercel />,
  Razorpay: <SiRazorpay />,
  Cloudinary: <SiCloudinary />,
  'Three.js': <SiThreedotjs />,
  'Framer Motion': <SiFramer />,
};

export const projects = [
  {
    num: '01',
    title: 'Clinical Practice Management Platform',
    slug: 'clinical-practice-management',
    category: 'healthcare',
    type: 'in-house',
    featured: true,
    order: 1,
    /** Optional screenshot/thumbnail path. Null renders a gradient placeholder. */
    thumbnail: null,
    subtitle: 'Full-stack clinic CRM with AI call intelligence',
    summary:
      'A production clinic-management system covering the whole patient journey — enquiry, clinical records, scheduling, consultation, billing and follow-up — with branch-level data isolation, mandatory two-factor authentication, and an AI layer that analyses recorded calls.',
    problem:
      'A clinic network was running leads, patient records, appointments and billing without a shared system. Double-booking, duplicate patient records, and cross-branch data leakage were all reachable, and recorded consultation calls were never reviewed, so call quality was unmeasured.',
    contribution:
      'I built this system end to end — every backend and frontend commit in the repository is mine. That includes the scheduling model, the two-factor authentication flow, branch-level data isolation, the permission system, the full analytics suite, and the AI call-intelligence pipeline. I also wrote the project\'s own security and correctness audit, then fixed what it found.',
    features: [
      'Lead pipeline with deterministic scoring',
      'Patient records & clinical history',
      'Appointment scheduling, reschedule & cancel',
      'Mandatory 2FA (phone OTP)',
      'RBAC across 37 permission modules',
      'Branch-level data isolation',
      'AI call transcription & 7-axis scoring',
      'Agentic booking assistant (21 tools)',
      'RAG knowledge base over CRM data',
      'Multi-provider AI gateway',
      'Prompt-injection fencing & usage budgets',
      'Payments, refunds & payouts',
      'Video consultation rooms',
      'Automated email & follow-ups',
      'Multi-branch analytics dashboards',
      'No-code report/page builder',
    ],
    challenges: [
      {
        title: 'Audited my own codebase and fixed what it found',
        detail:
          'Wrote a full audit of the platform covering security, concurrency and data integrity — then fixed the findings it raised and corrected the report where it was wrong. Cross-branch isolation was claimed but not actually tested, so I added the test that proves it rather than leaving the claim unsupported.',
      },
      {
        title: 'Made double-booking impossible at the database level',
        detail:
          'Application-level checks still race under concurrent requests. Added sparse unique indexes on the doctor/date/slot key and on the doctor/date/patient key, so the database itself rejects a conflicting write. Cancellation unsets those keys rather than nulling them, which frees the slot by construction and keeps cancelled rows from colliding.',
      },
      {
        title: 'Stopped a follow-up sweep from re-notifying 331 times a day',
        detail:
          'A scheduled reminder sweep was re-processing the same records on every pass, so staff received the same follow-up hundreds of times. Fixed the sweep so each reminder fires once, and made the batch deterministic — including pinning timestamps in the timeline tests, which had been passing by luck.',
      },
      {
        title: 'Blocked duplicate patients without breaking lead conversion',
        detail:
          'Duplicate phone numbers were slipping through on both create and update, and a later duplicate check was quietly blocking legitimate lead-to-patient conversions. Made the constraint cover updates as well as creates, and when a duplicate does block a record, the UI now offers a merge instead of a dead end.',
      },
      {
        title: 'Designed 2FA so a valid password can never mean access',
        detail:
          'A correct password issues a short-lived pending token that the main auth middleware structurally rejects — only the two OTP-completion routes accept it. The raw one-time code is verified by the identity provider and never reaches our backend, so a stolen password alone is not a path to records.',
      },
      {
        title: 'Built an agentic assistant that can book — but never on its own',
        detail:
          'The AI assistant is a real tool-calling agent: it can look up doctor availability, check an existing appointment, prepare a booking, and cancel or move one, using 21 typed tools. It stops before any write that matters and asks for confirmation, authorised by a server-issued token — so the model cannot complete a booking on its own even if it decides to try. Tool results are fenced as untrusted content to defend against prompt injection, and the option buttons a user clicks are copied verbatim from real tool output, so the model has nothing to invent a doctor or a free slot from.',
      },
      {
        title: 'Made retrieval respect the reader\'s permissions',
        detail:
          'The knowledge base searches live CRM records, so a search must never surface something the person asking is not allowed to see. Retrieval is filtered against the same permission model that gates the pages, and documents are re-indexed idempotently by content hash so a rebuild never duplicates a record. Every AI feature also draws on one shared usage budget, so a single expensive feature cannot starve the rest.',
      },
    ],
    architecture: [
      'React 19 SPA  —  React Query · Tailwind · Socket.IO',
      '   |  httpOnly session cookie + CSRF double-submit',
      '   v',
      'Express 4 API  —  auth · RBAC · branch scope · rate limits',
      '   |',
      '   +--> Mongoose  --->  MongoDB (78 models, Atlas Vector Search)',
      '   +--> BullMQ / Redis  —  email, call processing',
      '   +--> AI gateway  ->  Anthropic / Gemini / local',
      '   +--> Razorpay · Zoom · SMTP/IMAP · Firebase Auth',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Claude AI', 'Socket.IO', 'Docker'],
    period: 'In-house product',
    status: 'In production',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.05))',
    privateRepo: true,
    scale: '78 data models · 367 API endpoints · 189 test files',
  },
  {
    num: '02',
    title: 'Consultation Booking & Lead Management CRM',
    slug: 'consultation-booking-crm',
    category: 'healthcare',
    type: 'client',
    featured: true,
    order: 2,
    /** Optional screenshot/thumbnail path. Null renders a gradient placeholder. */
    thumbnail: null,
    subtitle: 'Lead, booking and payment platform',
    summary:
      'A consultation-scheduling and lead-management platform for a healthcare provider — covering enquiry through booking to payment, with a scheduling engine, role-based page permissions, and six backend services.',
    problem:
      'The practice ran leads, patients, consultations, and payments in disconnected systems. Enquiries arrived from phone, WhatsApp, and the website with no shared record, so double-booking, missed callbacks, and unclear ownership were routine.',
    contribution:
      'I am the primary developer on this system — 196 backend and 136 frontend commits are under my account. I own the consultation scheduling engine, the WATI (WhatsApp Business API) integration, the video-meeting provisioning and the Zoom-to-Microsoft-Teams migration, the page-level permission system, and the AI call-intelligence service.',
    features: [
      'Lead & patient management with duplicate detection',
      'Consultation scheduling with conflict detection',
      'Public online booking with payment holds',
      'Role-based access control (6 roles)',
      'WATI WhatsApp inbox & chat sync',
      'IVR call log integration',
      'Razorpay payments and refunds',
      'Zoom & Microsoft Teams meeting provisioning',
      'Automated email & follow-ups',
      '12 analytics dashboards',
      'AI call analysis & lead scoring',
      'In-app video consultation room',
      'Config-driven admin masters',
    ],
    challenges: [
      {
        title: 'Made WhatsApp a first-class channel, not a link-out',
        detail:
          'Built the WATI integration so the CRM owns the conversation: replies sent by an agent directly from the WATI dashboard are captured back into the CRM, each outbound message records which agent actually sent it, and leads arriving through WATI are auto-assigned from the conversation-assignment event instead of landing in an unowned queue. Also added a backfill to attribute historic WhatsApp leads and made the agent identity resolve from the WATI email rather than a display name that could be reused.',
      },
      {
        title: 'Migrated video consultations from Zoom to Microsoft Teams without losing a single booking',
        detail:
          'Introduced a meeting-provider discriminator so a consultation can be a Zoom or a Teams meeting, guaranteed that every booking path ends with a meeting attached, and kept the legacy Zoom fields and alias routes readable so older rows and clients kept working. Teams meetings are then synced to the calendar through the Graph API, and single-sign-on tokens are verified against the Microsoft JWKS rather than trusted.',
      },
      {
        title: 'Overlap bug in the scheduling engine',
        detail:
          'Availability was originally compared on exact instants, so a 07:00–07:45 session and a 07:30–08:15 session were reported as non-conflicting despite overlapping. Reworked sessions as occupying [start, start + duration) on a decoupled slot grid, so a 45-minute booking correctly blocks the following slot.',
      },
      {
        title: 'Widened the permission model without a database migration',
        detail:
          'Role permissions began as a flat list of view-only page keys and needed view/add/edit/delete granularity. Shipped the shape change with transparent in-memory upgrade on both read and write paths, plus a backfill run before authorization started reading the column — so no existing role was silently locked out of a screen it already had.',
      },
      {
        title: 'Closed a duplicate-patient race condition',
        detail:
          'The application-level duplicate-phone check was a race. Made the database unique constraint authoritative and treated the pre-check as a friendly fast path that improves the error message rather than providing correctness.',
      },
      {
        title: 'Cut the initial bundle from 1.65 MB to 156 KB gzipped',
        detail:
          'A 3 MB video SDK was downloaded before anything rendered, despite being needed on one route only. Introduced route-level code splitting across ~90 lazy routes so the SDK loads only when a consultation room is opened — a 90% reduction in what a first-time visitor downloads.',
      },
    ],
    architecture: [
      'React + TypeScript SPA',
      '   |  TanStack Query · react-hook-form + zod',
      '   v',
      'Express 5 API  —  JWT auth · RBAC middleware · audit context',
      '   |',
      '   +--> Prisma ORM --> PostgreSQL  (~110 models)',
      '   +--> BullMQ / Redis  — email, transcription, sync queues',
      '   +--> Cloudinary · Razorpay · WATI · Google Ads',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind', 'Docker', 'Redis'],
    period: 'Client project',
    status: 'In production',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.05))',
    privateRepo: true,
    scale: '~110 data models · ~280 API routes · 6 backend services',
  },
  {
    num: '03',
    title: 'Physiotherapy Practice Management Platform',
    slug: 'physiotherapy-practice-management',
    category: 'healthcare',
    type: 'client',
    featured: true,
    order: 3,
    /** Optional screenshot/thumbnail path. Null renders a gradient placeholder. */
    thumbnail: null,
    subtitle: 'Clinic management with treatment and billing',
    summary:
      'A multi-branch physiotherapy clinic system covering clinical records, treatment cycles, sessions, billing and reviews — built as three apps sharing one API: an admin workspace, a public lead-capture form, and the backend itself.',
    problem:
      'The clinic ran patients, sessions, billing and staff on disconnected systems. Treatment plans were tracked on paper, monthly billing was reconciled by hand, and a scheduled job that ran twice could duplicate invoices for the same month.',
    contribution:
      'Developed features across the admin application and the API — patient clinical intake, treatment cycles, session management and the billing and reporting pipeline — and contributed to the auth, scheduling and background-job work.',
    features: [
      'Patient clinical intake & assessment',
      'Treatment cycles & session management',
      'Consultation-to-patient conversion',
      'Monthly billing & revenue reporting',
      'Staff directory with role assignment',
      'Leave management with session reassignment',
      'GPS-based field journey tracking',
      'Role & menu-level permissions',
      'Public lead-capture form',
      'PDF, Excel & CSV report exports',
      'Real-time in-app notifications',
    ],
    challenges: [
      {
        title: 'Stopped duplicate monthly billing runs',
        detail:
          'Monthly billing is a scheduled job that had duplicated invoices when a stale process stayed alive. Added a distributed lease so only one instance runs a cycle, a build fingerprint plus watchdog to detect a stale process, and versioned route names so old code fails loudly instead of quietly writing bad data.',
      },
      {
        title: 'Moved heavy report rendering off the request thread',
        detail:
          'PDF and chart generation uses a native canvas binding that is unsafe to run on the main thread. Forked report rendering into a child process so a large export cannot stall the API.',
      },
      {
        title: 'Acted on a formal pre-launch security audit',
        detail:
          'A pre-launch review found routes with no authentication at all. Added JWT verification with bcrypt, applied it across every router, and added rate limiting, security headers, a CORS allow-list and structured request logging with correlation IDs — turning a not-production-ready verdict into a deployable system.',
      },
      {
        title: 'Generated sessions from treatment frequency, not by hand',
        detail:
          'Sessions follow each patient\'s prescribed frequency per week, so a scheduled job derives the day\'s session list, skips Sundays, and is idempotent — a session already created for that patient and day is never duplicated. When a therapist is on leave, affected sessions are reassigned rather than dropped.',
      },
    ],
    architecture: [
      'Public lead form (React SPA)',
      '   |',
      '   v',
      'Admin app (React + Tailwind)  —  Socket.IO notifications',
      '   |',
      '   v',
      'Express 5 API  —  JWT auth · RBAC · rate limits',
      '   |',
      '   +--> Mongoose  --->  MongoDB (53 models)',
      '   +--> Redis (cache)  ·  node-cron (6 leased jobs)',
      '   +--> Forked report worker  —  PDF / Excel / charts',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Socket.IO', 'Redis', 'Docker'],
    period: 'Client project',
    status: 'In production',
    color: '#06ffa5',
    gradient: 'linear-gradient(135deg, rgba(6,255,165,0.12), rgba(0,212,255,0.05))',
    privateRepo: true,
    scale: '313 API routes · 53 data models · 3 apps',
  },
  {
    num: '04',
    title: 'HR Management System',
    slug: 'hr-management-system',
    category: 'operations',
    type: 'in-house',
    featured: true,
    order: 4,
    /** Optional screenshot/thumbnail path. Null renders a gradient placeholder. */
    thumbnail: null,
    subtitle: 'Attendance, leave and workforce management',
    summary:
      'An HRMS covering employee records, attendance, leave, shifts, recruitment and project tracking. My work focused on the attendance engine and the leave and permission request workflows — the parts where duplicate records and an unstable scheduled job were causing real problems.',
    problem:
      'Attendance was written without a concurrency guard, so two check-ins for the same person on the same day could create duplicate records and corrupt the worked-hours totals. Separately, the nightly auto-checkout job was taking the whole API process down every evening, so the system was going down at a predictable time.',
    contribution:
      'Built the attendance capture and auto-checkout pipeline, and the leave and permission request workflows with their notification handling — including the database constraints and the failure handling that made the scheduled job safe to run.',
    features: [
      'Employee records & designations',
      'Clock in / out with break tracking',
      'Automatic checkout of forgotten sessions',
      'Leave requests & leave balances',
      'Permission requests (short leave)',
      'Shift & holiday masters',
      'Late-login and absentee dashboard',
      'Recruitment pipeline',
      'Projects, tasks and tickets',
      'Group chat & notifications',
      'Activity audit log',
    ],
    challenges: [
      {
        title: 'Stopped duplicate attendance under concurrent check-ins',
        detail:
          'Two check-ins for the same employee on the same day could both succeed, creating duplicate records that quietly corrupted worked-hours totals. Added a unique compound index on employee and date so the database rejects the second write, and turned the resulting duplicate-key error into a retry that appends the session instead of failing the request.',
      },
      {
        title: 'Made a nightly job that killed the server safe to run',
        detail:
          'The 7 PM auto-checkout job was taking the whole process down every day. Wrapped the scheduled body so a failure inside it can never terminate the API, isolated each record so one malformed entry cannot abort the whole batch, and added process-level handlers that log an unhandled rejection loudly instead of letting it kill the server.',
      },
      {
        title: 'Got the calendar day right across timezones',
        detail:
          'Attendance is keyed by calendar day, so the boundary matters. Derived the day key from the IST calendar day rather than the server clock, so an 11 PM check-in is recorded against the correct date and the day totals stay correct.',
      },
      {
        title: 'Kept leave balances consistent through approval changes',
        detail:
          'Leave days are deducted when a request is approved and refunded when it moves away from approved, so a request can be approved, then cancelled or corrected, without the balance drifting. Both transitions push a real-time notification, and a rejected request must carry a reason.',
      },
    ],
    architecture: [
      'React SPA  —  Tailwind · Radix · Socket.IO client',
      '   |',
      '   v',
      'Express 5 API  —  Mongoose models · controllers',
      '   |',
      '   +--> MongoDB  —  unique index on attendance {employee, date}',
      '   +--> Socket.IO  —  realtime notifications',
      '   +--> node-cron  —  nightly auto-checkout (guarded)',
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Tailwind'],
    period: 'In-house product',
    status: 'In production',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,212,255,0.05))',
    privateRepo: true,
    scale: '184 API routes · 40+ data models',
  },
  {
    num: '05',
    title: 'Subwikha Hub',
    slug: 'subwikha-hub',
    category: 'ecommerce',
    type: 'personal',
    featured: true,
    order: 5,
    /** Optional screenshot/thumbnail path. Null renders a gradient placeholder. */
    thumbnail: null,
    subtitle: 'E-commerce platform for gifting',
    summary:
      'A complete gifting storefront — catalogue, cart, checkout, order tracking and an admin dashboard — built on React and Firebase, with a static-prerender pipeline that makes every product page readable by crawlers and AI answer engines that never execute JavaScript.',
    problem:
      'A single-page storefront hides its content behind JavaScript, so product pages were effectively invisible to crawlers and to AI assistants answering shopping questions. The business also needed real payment verification and order tracking, not a static brochure.',
    contribution:
      'Built the storefront and the serverless order pipeline, and designed the prerender system that emits crawlable HTML for every route as part of the build — including structured data and machine-readable summary files.',
    features: [
      'Product catalogue & category pages',
      'Cart & checkout with Razorpay',
      'Server-side payment verification',
      'Order tracking timeline',
      'Admin dashboard (orders, products, analytics)',
      'Gift finder & wishlist',
      'Referral sharing & gift reminders',
      'Product Q&A chat widget',
      '3D scroll-driven product showcase',
      'Static prerender for every route',
    ],
    challenges: [
      {
        title: 'Made a JavaScript app crawlable',
        detail:
          'Added a build step that writes a real HTML file per route containing the title, description, canonical URL, Open Graph tags, JSON-LD and the actual page content, then lets React hydrate over it. The same step emits a sitemap, robots.txt and machine-readable summary files, and it fails the build on duplicate titles, missing alt text or invalid structured data — so SEO regressions cannot ship silently.',
      },
      {
        title: 'Kept payment verification on the server',
        detail:
          'Payment success is confirmed by a serverless function that verifies the signature against a secret and writes the order through the admin SDK. The browser can request a payment but can never assert that one succeeded.',
      },
      {
        title: 'Kept a heavy 3D showcase usable',
        detail:
          'The scroll-driven product showcase uses WebGL, so it is scoped to the viewport, respects reduced-motion preferences, and degrades to a static layout where the device or browser cannot support it.',
      },
    ],
    architecture: [
      'React + Vite SPA',
      '   |  React Router · Framer Motion',
      '   v',
      'Vercel serverless functions  ->  order + payment verification',
      '   v',
      'Firebase  —  Firestore (catalogue, orders) · Auth · Storage',
      '   v',
      'Cloudinary (media) · Razorpay (payments)',
    ],
    tags: ['React', 'Firebase', 'Vercel', 'Razorpay', 'Cloudinary', 'Three.js', 'Framer Motion'],
    period: 'Personal project',
    status: 'Live',
    color: '#f72585',
    gradient: 'linear-gradient(135deg, rgba(247,37,133,0.14), rgba(0,212,255,0.05))',
    github: githubRepoUrl('subwikhashub'),
    demo: 'https://subwikhahub.vercel.app/',
    scale: '20+ routes · 6 serverless functions',
  },
  {
    num: '06',
    title: 'Flow — Task & Productivity Platform',
    slug: 'flow-productivity',
    category: 'productivity',
    type: 'personal',
    featured: true,
    order: 6,
    /** Optional screenshot/thumbnail path. Null renders a gradient placeholder. */
    thumbnail: null,
    subtitle: 'Full-stack MERN + TypeScript productivity app',
    summary:
      'A task and productivity application built as a proper product rather than a CRUD demo: an inbox for fast capture, a Today view, recurring tasks, subtasks, comments, projects, categories and tags, a calendar, and a dashboard — with a TypeScript API behind it.',
    problem:
      'Most task managers fall over in the same three places: authentication that leaks tokens, spreadsheet imports that fail wholesale on one bad row, and authorisation that confirms a record exists to someone who should not know it does. I wanted an app that got those right from the start.',
    contribution:
      'I built the whole thing — the Express + TypeScript API, the React + TypeScript SPA, and the test suites on both sides. The frontend and backend live in separate public repositories, linked below.',
    features: [
      'JWT auth with rotating refresh tokens',
      'Tasks with subtasks, comments & activity history',
      'Recurring tasks with automatic next occurrence',
      'Inbox, Today, Upcoming & Calendar views',
      'Projects, categories & freeform tags',
      'Bulk import from Excel / CSV',
      'Global debounced search',
      'User settings — timezone, date format, defaults',
      'Keyboard shortcuts & accessible modals',
    ],
    challenges: [
      {
        title: 'Kept the access token out of reach of injected scripts',
        detail:
          'Tokens are issued as httpOnly cookies rather than written to localStorage, so a script injected into the page cannot read them. A short-lived access token is held in memory and refreshed through a rotating httpOnly refresh cookie, and the API also accepts a Bearer token so it can be driven from scripts and tests directly.',
      },
      {
        title: 'Chose the spreadsheet library for its security record, not its popularity',
        detail:
          'The commonly used `xlsx` build on the npm registry carries unpatched high-severity prototype-pollution and ReDoS advisories. This is the one place in the app that parses files uploaded by strangers, so I used ExcelJS instead — and wrote the importer so each row either imports or reports its own error, with a 500-row and 5 MB cap.',
      },
      {
        title: 'Made authorisation answers the same for every user',
        detail:
          'Every read and write filters on the owner as well as the id, so another account\'s id simply does not match. That returns a 404 rather than a 403, which means the response never confirms that the record exists.',
      },
      {
        title: 'Split server state from interface state on purpose',
        detail:
          'All server data lives in the query cache; a small store holds only the handful of genuinely global interface concerns — the quick-add modal, the search palette, the open task drawer. There is no store slice that mirrors data the server already owns.',
      },
    ],
    architecture: [
      'React 18 + TypeScript SPA  —  TanStack Query · React Hook Form + Zod',
      '   |  httpOnly access & refresh cookies',
      '   v',
      'Express + TypeScript API  —  JWT · Zod validators · rate limits · Helmet',
      '   |',
      '   +--> Mongoose  --->  MongoDB (User, Todo, Project, Category, Activity)',
      '   +--> Multer + ExcelJS  —  spreadsheet import & template',
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    period: 'Personal project',
    status: 'Open source',
    color: '#00ffa3',
    gradient: 'linear-gradient(135deg, rgba(0,255,163,0.12), rgba(0,212,255,0.05))',
    repos: [
      { label: 'Frontend source', url: githubRepoUrl('todo') },
      { label: 'Backend source', url: githubRepoUrl('todobackend') },
    ],
    demo: 'https://todo-beige-delta-46.vercel.app/',
    scale: '43 API routes · 5 data models · 6 task views · Jest + Vitest suites',
  },
];
