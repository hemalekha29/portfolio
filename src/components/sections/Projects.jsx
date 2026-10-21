import { useMemo, useRef, useState } from 'react';
import { FiSearch, FiX, FiLock } from 'react-icons/fi';
import { projects } from '../../data/projects';
import { filterProjects, getCategories, sortProjects } from '../../utils/filters';
import ProjectCard from '../ui/ProjectCard';
import ProjectDetail from '../ui/ProjectDetail';
import SectionHeader from '../ui/SectionHeader';
import EmptyState from '../ui/EmptyState';
import '../../styles/Projects.css';

const ALL = 'all';

export default function Projects() {
  const [open, setOpen] = useState(() => new Set());
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState('');
  const cardRefs = useRef({});

  const ordered = useMemo(() => sortProjects(projects), []);
  const categories = useMemo(() => getCategories(ordered), [ordered]);

  const visible = useMemo(
    () => filterProjects(ordered, { category, query }),
    [ordered, category, query],
  );

  const toggle = (project) => {
    const wasOpen = open.has(project.slug);
    setOpen(prev => {
      const next = new Set(prev);
      next.has(project.slug) ? next.delete(project.slug) : next.add(project.slug);
      return next;
    });
    // The card grows to full width, so bring the detail into view on open.
    if (!wasOpen) {
      requestAnimationFrame(() => {
        cardRefs.current[project.slug]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const resetFilters = () => {
    setCategory(ALL);
    setQuery('');
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <SectionHeader
          tag="// projects{}"
          title="Featured Work"
          subtitle="Production systems I have contributed to, and the engineering problems behind them."
        />

        {/* Filters */}
        <div className="projects-filters" data-aos="fade-up" data-aos-delay="80">
          <div className="project-categories" role="group" aria-label="Filter projects by category">
            <button
              className={`category-chip ${category === ALL ? 'active' : ''}`}
              onClick={() => setCategory(ALL)}
              aria-pressed={category === ALL}
            >
              All
              <span className="chip-count">{ordered.length}</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-chip ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
              >
                {cat.label}
                <span className="chip-count">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="project-search">
            <FiSearch className="search-icon" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects or technologies"
              aria-label="Search projects"
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <FiX />
              </button>
            )}
          </div>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title="No projects match that"
            message="Try a different category, or clear the search to see everything."
            action={
              <button className="empty-state-action" onClick={resetFilters}>
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="projects-grid">
            {visible.map((p, i) => {
              const isOpen = open.has(p.slug);
              return (
                <div
                  key={p.slug}
                  className={`project-slot ${isOpen ? 'is-open' : ''}`}
                  ref={el => { cardRefs.current[p.slug] = el; }}
                >
                  <ProjectCard
                    project={p}
                    index={i}
                    isOpen={isOpen}
                    onToggle={() => toggle(p)}
                  />
                  {isOpen && <ProjectDetail project={p} />}
                </div>
              );
            })}
          </div>
        )}

        <div className="projects-note">
          <span className="projects-note-icon" aria-hidden="true">
            <FiLock />
          </span>
          <p className="projects-note-text">
            <strong>Client and in-house repositories are private</strong>, so source links are
            withheld. Everything above is described from the systems I worked on directly.
          </p>
        </div>
      </div>
    </section>
  );
}
