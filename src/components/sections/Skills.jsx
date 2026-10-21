import { useState } from 'react';
import { categories } from '../../data/skills';
import SectionHeader from '../ui/SectionHeader';
import '../../styles/Skills.css';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? 'frontend');
  const active = categories.find(c => c.id === activeTab) ?? categories[0];

  if (!active) return null;

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <SectionHeader
          tag="// skills[]"
          title="Technical Skills"
          subtitle="Grouped by role — evidence for each skill is in the projects below."
        />

        {/* Tabs */}
        <div
          className="skills-tabs"
          data-aos="fade-up"
          data-aos-delay="100"
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map(({ id, label, title, color, icon }) => (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-selected={activeTab === id}
              aria-controls={`panel-${id}`}
              className={`skill-tab ${activeTab === id ? 'active' : ''}`}
              style={{ '--tab-clr': color }}
              onClick={() => setActiveTab(id)}
            >
              <span className="skill-tab-icon">{icon}</span>
              <span>{label}</span>
              <span className="skill-tab-title">{title}</span>
            </button>
          ))}
        </div>

        {/* Applied-in context */}
        <p className="skills-applied" key={`${activeTab}-applied`}>
          {active.applied}
        </p>

        {/* Skills grid */}
        <div
          className="skills-grid"
          key={activeTab}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
        >
          {active.skills.map(({ icon, name, proficiency }, i) => (
            <div
              key={name}
              className="skill-card glass-card"
              data-aos="zoom-in"
              data-aos-delay={i * 80}
              style={{ '--clr': active.color }}
            >
              <div className="skill-icon" style={{ color: active.color }}>{icon}</div>
              <div className="skill-text">
                <span className="skill-name">{name}</span>
                <span className="skill-note">{proficiency}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Expertise tags */}
        <div className="expertise-row" data-aos="fade-up" data-aos-delay="200">
          {[
            'Full Stack Web Development',
            'REST API Development',
            'Authentication & Authorization',
            'Responsive Web Design',
            'MERN Stack',
            'Agentic AI & RAG',
            'Workflow Automation',
            'Production Troubleshooting',
            'API Debugging',
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
