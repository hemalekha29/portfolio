import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { repositories } from '../../data/repositories';
import { githubProfileUrl, hasGitHub } from '../../data/github.js';
import SectionHeader from '../ui/SectionHeader';
import '../../styles/Repositories.css';

/**
 * A strip of the public repositories.
 *
 * The point of this section is verifiability: every card links straight to
 * a public repository, so a reader can check the work rather than take a
 * screenshot of it on trust.
 *
 * The whole section is hidden while no GitHub account is configured — every
 * card links to the account, so with no account there is nothing to show.
 */
export default function Repositories() {
  if (!hasGitHub()) return null;

  return (
    <section id="repositories" className="repo-section">
      <div className="container">
        <SectionHeader
          tag="// git.repositories"
          title="Open Source"
          subtitle="Public repositories you can open, read and run yourself."
        />

        <div className="repo-grid">
          {repositories.map((repo, i) => (
            <article
              key={repo.id}
              className="repo-card glass-card"
              data-aos="fade-up"
              data-aos-delay={i * 90}
              data-mern-zone
              data-mern-stack={repo.stack.join('|')}
            >
              <div className="repo-top">
                <span className="repo-icon" aria-hidden="true"><FiGithub /></span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-name"
                >
                  {repo.name}
                </a>
                {repo.demo && (
                  <a
                    href={repo.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="repo-live"
                    title="Open the live deployment"
                    aria-label={`Open the live deployment of ${repo.name}`}
                  >
                    <FiExternalLink />
                  </a>
                )}
              </div>

              <p className="repo-desc">{repo.description}</p>

              <div className="repo-foot">
                <span className="repo-lang">
                  <FiCode aria-hidden="true" /> {repo.language}
                </span>
                <span className="repo-stack">{repo.stack.join(' · ')}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="repo-more" data-aos="fade-up">
          <a href={githubProfileUrl()} target="_blank" rel="noreferrer" className="btn-outline">
            <FiGithub /> See every repository
          </a>
        </div>
      </div>
    </section>
  );
}
