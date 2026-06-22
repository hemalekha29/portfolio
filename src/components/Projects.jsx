import { useState } from 'react';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb,
  SiVuedotjs, SiSocketdotio, SiHtml5, SiCss, SiJavascript, SiBootstrap,
} from 'react-icons/si';
import '../styles/Projects.css';

const techIcons = {
  'React.js': <SiReact />, 'Node.js': <SiNodedotjs />, 'Express.js': <SiExpress />,
  'MongoDB': <SiMongodb />, 'Vue.js': <SiVuedotjs />, 'Socket.io': <SiSocketdotio />,
  'HTML': <SiHtml5 />, 'CSS': <SiCss />, 'JavaScript': <SiJavascript />, 'Bootstrap': <SiBootstrap />,
};

const projects = [
  {
    num: '01',
    title: 'Physio Management System',
    subtitle: 'Full-stack Healthcare Platform',
    description:
      'A comprehensive management system to streamline physiotherapy operations and patient management. Features appointment scheduling, record management, and responsive UI for efficient workflow.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    duration: '4 Months',
    status: 'Completed',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.05))',
    features: ['Patient Record Management', 'Appointment Scheduling', 'Responsive Design', 'REST API Integration'],
    github: 'https://github.com/hemalekha29',
  },
  {
    num: '02',
    title: 'Real-Time Chat Application',
    subtitle: 'Live Messaging Platform',
    description:
      'A real-time messaging system with instant communication features. Implemented socket connections for live chat functionality, enabling seamless real-time data exchange between users.',
    tags: ['Vue.js', 'Node.js', 'Socket.io'],
    duration: 'Personal Project',
    status: 'Completed',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(247,37,133,0.05))',
    features: ['Real-time Messaging', 'Socket.io Integration', 'Live Chat', 'Instant Notifications'],
    github: 'https://github.com/hemalekha29',
  },
  {
    num: '03',
    title: 'To-Do List Application',
    subtitle: 'Task Management App',
    description:
      'A responsive task management application with full CRUD functionality. Built with vanilla JavaScript for lightweight performance, featuring Bootstrap for responsive design.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    duration: 'Personal Project',
    status: 'Completed',
    color: '#06ffa5',
    gradient: 'linear-gradient(135deg, rgba(6,255,165,0.12), rgba(0,212,255,0.05))',
    features: ['Task Creation', 'Update & Delete', 'Responsive UI', 'Local Storage'],
    github: 'https://github.com/hemalekha29',
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">// projects{'{}'}</span>
          <h2 className="section-title">Featured Work</h2>
          <div className="section-line" />
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={p.num}
              className={`project-card glass-card ${hovered === i ? 'hovered' : ''}`}
              style={{ '--clr': p.color, '--grad': p.gradient }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              {/* Top glow */}
              <div className="card-glow" />

              {/* Header */}
              <div className="proj-header">
                <div className="proj-num-wrap">
                  <span className="proj-num">{p.num}</span>
                </div>
                <div className="proj-actions">
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-action-btn" title="GitHub">
                    <FiGithub />
                  </a>
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj-action-btn" title="Live">
                    <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Body */}
              <div className="proj-body">
                <span className="proj-subtitle">{p.subtitle}</span>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.description}</p>

                {/* Features */}
                <ul className="proj-features">
                  {p.features.map(f => (
                    <li key={f}>
                      <span className="feat-dot" style={{ background: p.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="proj-footer">
                <div className="proj-tags">
                  {p.tags.map(tag => (
                    <span key={tag} className="proj-tag">
                      <span style={{ color: p.color }}>{techIcons[tag]}</span>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="proj-meta">
                  <span className="proj-status" style={{ color: p.color }}>● {p.status}</span>
                  <span className="proj-dur">{p.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
