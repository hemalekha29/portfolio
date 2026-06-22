import { useState } from 'react';
import { FiCode } from 'react-icons/fi';
import {
  SiReact, SiJavascript, SiNextdotjs, SiTypescript,
  SiNodedotjs, SiExpress, SiMongodb, SiSupabase,
  SiGit, SiGithub, SiVuedotjs, SiHtml5, SiCss, SiBootstrap,
  SiSocketdotio, SiPostman,
} from 'react-icons/si';
import '../styles/Skills.css';

const categories = [
  {
    id: 'frontend',
    label: 'frontend[]',
    color: '#00d4ff',
    skills: [
      { icon: <SiReact />,      name: 'React.js',    level: 85 },
      { icon: <SiNextdotjs />,  name: 'Next.js',     level: 72 },
      { icon: <SiJavascript />, name: 'JavaScript',  level: 82 },
      { icon: <SiTypescript />, name: 'TypeScript',  level: 68 },
      { icon: <SiVuedotjs />,   name: 'Vue.js',      level: 65 },
      { icon: <SiHtml5 />,      name: 'HTML5',       level: 90 },
      { icon: <SiCss />,        name: 'CSS3',        level: 85 },
      { icon: <SiBootstrap />,  name: 'Bootstrap',   level: 80 },
    ],
  },
  {
    id: 'backend',
    label: 'backend{}',
    color: '#7c3aed',
    skills: [
      { icon: <SiNodedotjs />,  name: 'Node.js',    level: 80 },
      { icon: <SiExpress />,    name: 'Express.js', level: 78 },
      { icon: <SiMongodb />,    name: 'MongoDB',    level: 75 },
      { icon: <SiSupabase />,   name: 'Supabase',   level: 65 },
      { icon: <SiSocketdotio />,name: 'Socket.io',  level: 65 },
    ],
  },
  {
    id: 'tools',
    label: 'tools()',
    color: '#06ffa5',
    skills: [
      { icon: <SiGit />,            name: 'Git',      level: 78 },
      { icon: <SiGithub />,         name: 'GitHub',   level: 80 },
      { icon: <FiCode />,           name: 'VS Code',  level: 90 },
      { icon: <SiPostman />,        name: 'Postman',  level: 72 },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const active = categories.find(c => c.id === activeTab);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">// skills[]</span>
          <h2 className="section-title">Tech Arsenal</h2>
          <div className="section-line" />
        </div>

        {/* Tabs */}
        <div className="skills-tabs" data-aos="fade-up" data-aos-delay="100">
          {categories.map(({ id, label, color }) => (
            <button
              key={id}
              className={`skill-tab ${activeTab === id ? 'active' : ''}`}
              style={{ '--tab-clr': color }}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="skills-grid" key={activeTab}>
          {active.skills.map(({ icon, name, level }, i) => (
            <div
              key={name}
              className="skill-card glass-card"
              data-aos="zoom-in"
              data-aos-delay={i * 80}
              style={{ '--clr': active.color }}
            >
              <div className="skill-icon" style={{ color: active.color }}>{icon}</div>
              <span className="skill-name">{name}</span>
              <div className="skill-bar-wrap">
                <div
                  className="skill-bar-fill"
                  style={{ '--w': level + '%', background: active.color }}
                />
              </div>
              <span className="skill-level">{level}%</span>
            </div>
          ))}
        </div>

        {/* Expertise tags */}
        <div className="expertise-row" data-aos="fade-up" data-aos-delay="200">
          {[
            'Full Stack Web Development',
            'REST API Development',
            'Responsive Web Design',
            'MERN Stack',
            'Next.js & TypeScript',
            'Supabase & BaaS',
            'Client Communication',
            'Debugging & Bug Fixing',
            'Real-time Applications',
          ].map((tag, i) => (
            <span key={tag} className="expertise-tag" data-aos="zoom-in" data-aos-delay={i * 60}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
