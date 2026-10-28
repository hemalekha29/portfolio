import { FiGithub, FiExternalLink, FiTarget, FiTool } from 'react-icons/fi';

/**
 * The expanded case-study view for a project.
 *
 * Rendered inside the project card, below the summary. Every section is
 * optional — a record missing `problem`, `challenges` or `architecture`
 * simply omits that part rather than rendering an empty heading.
 */
export default function ProjectDetail({ project }) {
  const p = project;

  const hasProblem = Boolean(p.problem);
  const hasContribution = Boolean(p.contribution);
  const hasFeatures = p.features?.length > 0;
  const hasChallenges = p.challenges?.length > 0;
  const hasArchitecture = p.architecture?.length > 0;

  /* A project can have one repository or several (a separate backend, for
     instance). `github` is the shorthand for the single-repo case. Entries
     with no URL are dropped. */
  const repos = (p.repos || (p.github ? [{ label: 'View source', url: p.github }] : []))
    .filter(repo => repo.url);

  if (!hasProblem && !hasContribution && !hasFeatures && !hasChallenges && !hasArchitecture) {
    return null;
  }

  return (
    <div className="proj-detail" id={`proj-detail-${p.slug}`}>
      {(hasProblem || hasContribution) && (
        <div className="detail-cols">
          {hasProblem && (
            <section className="detail-col">
              <h4>
                <span className="detail-h-icon"><FiTarget /></span>
                The problem
              </h4>
              <p>{p.problem}</p>
            </section>
          )}

          {hasContribution && (
            <section className="detail-col">
              <h4>
                <span className="detail-h-icon"><FiTool /></span>
                My contribution
              </h4>
              <p>{p.contribution}</p>
            </section>
          )}
        </div>
      )}

      {hasFeatures && (
        <section>
          <h4>Key features</h4>
          <ul className="proj-feature-grid">
            {p.features.map(f => (
              <li key={f}>
                <span className="feat-dot" style={{ background: p.color }} />
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasChallenges && (
        <section>
          <h4>Technical challenges</h4>
          <div className="challenge-grid">
            {p.challenges.map((c, ci) => (
              <div key={c.title} className="challenge">
                <span className="challenge-num" style={{ color: p.color }}>
                  {String(ci + 1).padStart(2, '0')}
                </span>
                <h5>{c.title}</h5>
                <p>{c.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {hasArchitecture && (
        <section>
          <h4>How it works</h4>
          <div className="proj-flow-wrap">
            <div className="proj-flow-head">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="proj-flow-file">architecture.txt</span>
            </div>
            <pre className="proj-flow">{p.architecture.join('\n')}</pre>
          </div>
        </section>
      )}

      {(repos.length > 0 || p.demo) && (
        <div className="detail-links">
          {repos.map(repo => (
            <a key={repo.url} href={repo.url} target="_blank" rel="noreferrer" className="detail-link-btn">
              <FiGithub /> {repo.label}
            </a>
          ))}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noreferrer" className="detail-link-btn is-primary">
              <FiExternalLink /> Live site
            </a>
          )}
        </div>
      )}
    </div>
  );
}
