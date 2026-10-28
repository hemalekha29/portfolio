/**
 * Central profile configuration.
 *
 * Everything here is static content that changes rarely. Updating a value in
 * this file (and the linked data files) is the only edit needed to change it
 * across the whole site — no component needs to be touched.
 *
 * Note: these are build-time values. Changing them requires a rebuild and
 * redeploy to appear on the live site; there is no runtime CMS.
 */

export const profile = {
  name: 'Hemalekha S',
  title: 'MERN Stack Developer',
  headline: 'MERN Stack Developer building scalable web applications',
  location: 'Coimbatore, India',
  email: 'hemalekha4@gmail.com',

  /** Professional portrait, served from /public. */
  image: '/images/hemzz-profile.jpg',
  imageAlt: 'Portrait of Hemalekha S, MERN Stack Developer',

  /**
   * The workspace photograph — a landscape shot of the developer at a
   * laptop, used in the About section. The studio portrait above is a
   * separate, tighter crop of the same person for the hero.
   */
  workspaceImage: '/images/developer-working.webp',
  workspaceImageAlt:
    'Hemalekha S working at a laptop in a developer workspace, with React, Node.js, Express.js and MongoDB on the wall behind her',

  /** Publicly reachable resume PDF. */
  resume: {
    path: '/images/Hemalekha_S_MERN_Resume.pdf',
    fileName: 'Hemalekha_S_MERN_Resume.pdf',
    label: 'Download Resume',
  },

  availability: {
    available: true,
    label: 'Available for opportunities',
  },

  /**
   * Reference into `employment` (src/data/experience.js) by id. Keeping this
   * as an id means the role's dates live in exactly one place.
   */
  currentRoleId: 'eethal-nad-it-solutions',

  /** The current employer — linked from the About section. */
  currentCompany: {
    name: 'Eethal Nad IT Solutions',
    url: 'https://eethalnaditsolutions.in/',
  },

  /** Short professional summary — used in the About section and meta tags. */
  summary:
    'MERN Stack Developer building production web applications with React, Node.js, Express and MongoDB. My work is concentrated in healthcare and practice-management software, where scheduling correctness, role-based access and data integrity are the hard parts rather than the forms.',

  /** Technologies highlighted in the hero and the recruiter summary. */
  stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'JavaScript'],

  seo: {
    title: 'Hemalekha S | MERN Stack Developer',
    description:
      'Hemalekha S – MERN Stack Developer building production web applications with React.js, Node.js, Express.js and MongoDB. Healthcare, practice-management and HR systems.',
    image: '/images/og-image.jpg',
    /** Production origin. Used for canonical + Open Graph URLs. */
    url: 'https://hemalekha.dev',
    twitter: '@hemalekha29',
  },
};

export default profile;
