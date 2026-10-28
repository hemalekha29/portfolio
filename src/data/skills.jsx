import { FiZap, FiCode, FiDatabase, FiServer, FiLayout, FiTool } from 'react-icons/fi';
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress, SiMongodb, SiMongoose, SiPostgresql, SiPrisma,
  SiRedis, SiGit, SiGithub,
  SiDocker, SiPostman,
} from 'react-icons/si';

/**
 * Skills grouped by role.
 *
 * Each skill carries a descriptive `proficiency` line rather than a
 * self-assigned percentage — a "React 85%" bar communicates nothing a
 * recruiter can check, while a short note about how a technology is actually
 * used is verifiable against the project work.
 *
 * Fields:
 *   id          stable identifier, used as a React key
 *   name        display label
 *   icon        react-icons component
 *   proficiency short description of how the skill is applied
 *   featured    whether to show in the condensed summary
 *   order       display order within the category
 */

export const skillCategories = [
  {
    id: 'frontend',
    label: 'frontend[]',
    title: 'Frontend Development',
    color: '#00d4ff',
    icon: <FiLayout />,
    order: 1,
    applied:
      'Component architecture, hooks, and responsive layouts shipped in production apps.',
    skills: [
      { id: 'react', name: 'React.js', icon: <SiReact />, proficiency: 'Component architecture & hooks', featured: true, order: 1 },
      { id: 'typescript', name: 'TypeScript', icon: <SiTypescript />, proficiency: 'Typed components & API layers', featured: true, order: 2 },
      { id: 'javascript', name: 'JavaScript', icon: <SiJavascript />, proficiency: 'ES6+ across the stack', featured: true, order: 3 },
      { id: 'html5', name: 'HTML5', icon: <SiHtml5 />, proficiency: 'Semantic, accessible markup', featured: true, order: 4 },
      { id: 'css3', name: 'CSS3', icon: <SiCss />, proficiency: 'Flexbox, Grid, responsive UI', featured: true, order: 5 },
      { id: 'tailwind', name: 'Tailwind CSS', icon: <SiTailwindcss />, proficiency: 'Utility-first styling', featured: false, order: 6 },
    ],
  },
  {
    id: 'backend',
    label: 'backend{}',
    title: 'Backend Development',
    color: '#7c3aed',
    icon: <FiServer />,
    order: 2,
    applied:
      'REST services, middleware, and third-party integrations behind live applications.',
    skills: [
      { id: 'node', name: 'Node.js', icon: <SiNodedotjs />, proficiency: 'Server runtime & async I/O', featured: true, order: 1 },
      { id: 'express', name: 'Express.js', icon: <SiExpress />, proficiency: 'Routing, middleware, REST APIs', featured: true, order: 2 },
      { id: 'rest', name: 'REST APIs', icon: <SiPostman />, proficiency: 'Design, auth, error handling', featured: true, order: 3 },
      { id: 'auth', name: 'Auth & Authorization', icon: <SiGithub />, proficiency: 'JWT, sessions, role-based access', featured: true, order: 4 },
      { id: 'api-int', name: 'API Integration', icon: <SiJavascript />, proficiency: 'Third-party service integration', featured: false, order: 5 },
    ],
  },
  {
    id: 'database',
    label: 'database()',
    title: 'Databases',
    color: '#06ffa5',
    icon: <FiDatabase />,
    order: 3,
    applied: 'Schema design, aggregation, and query performance on real datasets.',
    skills: [
      { id: 'mongodb', name: 'MongoDB', icon: <SiMongodb />, proficiency: 'Document modelling & queries', featured: true, order: 1 },
      { id: 'mongoose', name: 'Mongoose', icon: <SiMongoose />, proficiency: 'Schemas, validation, relations', featured: true, order: 2 },
      { id: 'postgresql', name: 'PostgreSQL', icon: <SiPostgresql />, proficiency: 'Relational modelling & joins', featured: true, order: 3 },
      { id: 'prisma', name: 'Prisma', icon: <SiPrisma />, proficiency: 'Typed schema & migrations', featured: false, order: 4 },
      { id: 'sql', name: 'SQL Fundamentals', icon: <FiDatabase />, proficiency: 'Relational concepts & joins', featured: false, order: 5 },
    ],
  },
  {
    id: 'languages',
    label: 'languages[]',
    title: 'Languages',
    color: '#f72585',
    icon: <FiCode />,
    order: 4,
    applied: 'Primary languages used for day-to-day development.',
    skills: [
      { id: 'lang-js', name: 'JavaScript', icon: <SiJavascript />, proficiency: 'Primary language', featured: true, order: 1 },
      { id: 'lang-ts', name: 'TypeScript', icon: <SiTypescript />, proficiency: 'Typed development', featured: true, order: 2 },
      { id: 'lang-html', name: 'HTML', icon: <SiHtml5 />, proficiency: 'Markup', featured: false, order: 3 },
      { id: 'lang-css', name: 'CSS', icon: <SiCss />, proficiency: 'Styling', featured: false, order: 4 },
    ],
  },
  {
    id: 'devops',
    label: 'devops[]',
    title: 'DevOps & Tools',
    color: '#00d4ff',
    icon: <FiTool />,
    order: 5,
    applied: 'Version control, containerisation, and production troubleshooting.',
    skills: [
      { id: 'git', name: 'Git', icon: <SiGit />, proficiency: 'Branching & code review', featured: true, order: 1 },
      { id: 'github', name: 'GitHub', icon: <SiGithub />, proficiency: 'Repositories & pull requests', featured: true, order: 2 },
      { id: 'docker', name: 'Docker', icon: <SiDocker />, proficiency: 'Containerised environments', featured: true, order: 3 },
      { id: 'postman', name: 'Postman', icon: <SiPostman />, proficiency: 'API testing & debugging', featured: false, order: 4 },
      { id: 'redis', name: 'Redis', icon: <SiRedis />, proficiency: 'Caching & background queues', featured: false, order: 5 },
    ],
  },
  {
    id: 'ai',
    label: 'ai()',
    title: 'AI & Agentic AI',
    color: '#7c3aed',
    icon: <FiZap />,
    order: 6,
    applied: 'LLM-backed features and tool-calling agents integrated into real workflows.',
    skills: [
      { id: 'agentic', name: 'Agentic AI', icon: <FiZap />, proficiency: 'Tool-calling agents with human confirmation', featured: true, order: 1 },
      { id: 'llm', name: 'LLM Integrations', icon: <FiZap />, proficiency: 'Prompt design & structured extraction', featured: true, order: 2 },
      { id: 'rag', name: 'RAG', icon: <SiPostman />, proficiency: 'Vector search over live application data', featured: true, order: 3 },
      { id: 'ai-features', name: 'AI-Powered Features', icon: <SiJavascript />, proficiency: 'Call analysis, summaries, insights', featured: false, order: 4 },
      { id: 'automation', name: 'Workflow Automation', icon: <SiNodedotjs />, proficiency: 'Automating manual processes', featured: false, order: 5 },
    ],
  },
];

/** Categories in display order. */
export const categories = [...skillCategories].sort((a, b) => a.order - b.order);

/** Every skill across all categories, flattened. */
export const allSkills = categories.flatMap((category) => category.skills);

/** Unique technology count — used for the hero stat. */
export const techCount = new Set(allSkills.map((skill) => skill.name)).size;

/** Look up a category by id. */
export const getCategory = (id) => categories.find((category) => category.id === id) || null;

/** The technology names in a category — used by the architecture navigator. */
export const skillsFor = (id) => {
  const category = getCategory(id);
  return category ? category.skills.map((skill) => skill.name) : [];
};
