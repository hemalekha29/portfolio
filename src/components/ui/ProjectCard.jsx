import { FiGithub, FiExternalLink, FiChevronDown, FiLock } from 'react-icons/fi';
import { techIcons } from '../../data/projects';

/**
 * A single project summary card.
 *
 * Renders entirely from the project record — adding a project to the data
 * file is all that is needed for a new card to appear.
 */
export default function ProjectCard({ project, isOpen, onToggle, index }) {
  const p = project;

  return (
    <article
      className={`project-card glass-card ${isOpen ? 'is-open' : ''}`}
      style={{ '--clr': p.color, '--grad': p.gradient }}
      data-aos="fade-up"
      data-aos-delay={index * 120}
    >
      <div className="card-glow" />

      <div className="proj-header">
        <div className="proj-num-wrap">
          <span className="proj-num">{p.num}</span>
        </div>
        <div className="proj-actions">
          {p.github ? (
            <a href={p.github} target="_blank" rel="noreferrer" className="proj-action-btn" title="Source code">
              <FiGithub />
            </a>
          ) : (
            <span className="proj-action-btn is-disabled" title="Private repository — link withheld">
              <FiLock />
            </span>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="proj-action-btn" title="Live demo">
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      <div className="proj-body">
        <span className="proj-subtitle">{p.subtitle}</span>
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.summary}</p>
        {p.scale && <p className="proj-scale">{p.scale}</p>}
      </div>

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
          <span className="proj-dur">{p.period}</span>
        </div>
      </div>

      <button
        className="proj-expand"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`proj-detail-${p.slug}`}
      >
        {isOpen ? 'Hide details' : 'View details'}
        <FiChevronDown className={isOpen ? 'rotated' : ''} />
      </button>
    </article>
  );
}
