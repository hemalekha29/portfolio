import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { employment } from '../../data/experience';
import { formatDateRange, formatDuration } from '../../utils/date';
import { getRoleDuration } from '../../utils/experience';
import SectionHeader from '../ui/SectionHeader';
import '../../styles/Experience.css';

/**
 * The period label for a role.
 *
 * Roles whose exact dates are not confirmed fall back to the configured
 * `periodLabel` rather than showing a misleading range.
 */
function rolePeriod(role) {
  if (!role.start) return role.periodLabel || '';
  return formatDateRange(role.start, role.current ? null : role.end);
}

export default function Experience() {
  return (
    <section id="experience" className="exp-section">
      <div className="container">
        <SectionHeader
          tag="// ./experience"
          title="Work Experience"
          subtitle="Roles, responsibilities and the problems I was brought in to solve."
        />

        <div className="timeline">
          {employment.map((job, i) => {
            const duration = getRoleDuration(job);
            const durationText =
              duration.totalMonths > 0 ? formatDuration(duration.totalMonths) : null;

            return (
              <div
                key={job.id}
                className="timeline-item"
                data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-delay={i * 120}
              >
                {/* Connector */}
                <div className="timeline-connector">
                  <div
                    className="tl-dot"
                    style={{ background: job.color, boxShadow: `0 0 16px ${job.color}` }}
                  />
                  {i < employment.length - 1 && <div className="tl-line" />}
                </div>

                {/* Card */}
                <div className="exp-card glass-card">
                  <div className="exp-top">
                    <div>
                      <div className="exp-type" style={{ color: job.color, borderColor: job.color }}>
                        {job.type}
                      </div>
                      <h3 className="exp-title">{job.title}</h3>
                      <span className="exp-company">@ {job.company}</span>
                    </div>
                    <div className="exp-meta">
                      <span><FiCalendar /> {rolePeriod(job)}</span>
                      {durationText && <span className="exp-duration">{durationText}</span>}
                      <span><FiMapPin /> {job.location}</span>
                    </div>
                  </div>

                  {job.summary && <p className="exp-summary">{job.summary}</p>}

                  <ul className="exp-points">
                    {job.responsibilities.map(pt => (
                      <li key={pt}>
                        <span className="pt-arrow" style={{ color: job.color }}>›</span>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {job.technologies?.length > 0 && (
                    <div className="exp-tags">
                      {job.technologies.map(tag => (
                        <span key={tag} className="exp-tag" style={{ '--clr': job.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
