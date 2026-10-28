import { useMemo, useRef, useState } from 'react';
import { FiSearch, FiX, FiLock } from 'react-icons/fi';
import { projects } from '../../data/projects';
import { filterProjects, getCategories, getTypes, sortProjects } from '../../utils/filters';
import ProjectCard from '../ui/ProjectCard';
import ProjectDetail from '../ui/ProjectDetail';
import SectionHeader from '../ui/SectionHeader';
import EmptyState from '../ui/EmptyState';
import '../../styles/Projects.css';

const ALL = 'all';

export default function Projects() {
  /* Only one project is expanded at a time — opening another collapses the
     previous one, so the detail view never competes with itself. */
  const [open, setOpen] = useState(null);
  const [category, setCategory] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [query, setQuery] = useState('');
  const cardRefs = useRef({});

  const ordered = useMemo(() => sortProjects(projects), []);
  const categories = useMemo(() => getCategories(ordered), [ordered]);
  const types = useMemo(() => getTypes(ordered), [ordered]);

  /* The chip counts are faceted: the category chips are counted against the
     list filtered by everything *except* the category, and the type chips
     against the list filtered by everything except the type. Otherwise
     picking a filter would zero out the counts on the other row. */
  const byCategory = useMemo(
    () => filterProjects(ordered, { type, query }),
    [ordered, type, query],
  );
  const byType = useMemo(
    () => filterProjects(ordered, { category, query }),
    [ordered, category, query],
  );

  const visible = useMemo(
    () => filterProjects(ordered, { category, type, query }),
    [ordered, category, type, query],
  );

  /** How many of the given list carry this category or type. */
  const countBy = (field, id, list) => list.filter(p => p[field] === id).length;

  const toggle = (project) => {
    const wasOpen = open === project.slug;
    setOpen(wasOpen ? null : project.slug);
    // The card grows to full width, and the previously open one collapses, so
    // the layout reflows. Wait two frames so the new position is final
    // before scrolling to it.
    if (!wasOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          cardRefs.current[project.slug]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
  };

  const resetFilters = () => {
    setCategory(ALL);
    setType(ALL);
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
              type="button"
              className={`category-chip ${category === ALL ? 'active' : ''}`}
              onClick={() => setCategory(ALL)}
              aria-pressed={category === ALL}
            >
              All
              <span className="chip-count">{byCategory.length}</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`category-chip ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
                aria-pressed={category === cat.id}
              >
                {cat.label}
                <span className="chip-count">{countBy('category', cat.id, byCategory)}</span>
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
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* Engagement type — company work, client work, or personal work. */}
        {types.length > 0 && (
          <div className="project-types" data-aos="fade-up" data-aos-delay="120">
            <span className="project-types-label">Engagement</span>
            <div className="project-categories" role="group" aria-label="Filter projects by engagement type">
              <button
                type="button"
                className={`category-chip ${type === ALL ? 'active' : ''}`}
                onClick={() => setType(ALL)}
                aria-pressed={type === ALL}
              >
                All
                <span className="chip-count">{byType.length}</span>
              </button>
              {types.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`category-chip ${type === t.id ? 'active' : ''}`}
                  onClick={() => setType(t.id)}
                  aria-pressed={type === t.id}
                >
                  {t.label}
                  <span className="chip-count">{countBy('type', t.id, byType)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {visible.length === 0 ? (
          <EmptyState
            title="No projects match that"
            message="Try a different category or engagement type, or clear the search to see everything."
            action={
              <button type="button" className="empty-state-action" onClick={resetFilters}>
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="projects-grid">
            {visible.map((p, i) => {
              const isOpen = open === p.slug;
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
