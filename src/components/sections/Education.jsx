import { FiAward, FiCalendar } from 'react-icons/fi';
import { education } from '../../data/education';
import { formatDateRange } from '../../utils/date';
import SectionHeader from '../ui/SectionHeader';
import '../../styles/Education.css';

export default function Education() {
  return (
    <section id="education" className="edu-section">
      <div className="container">
        <SectionHeader
          tag="// education()"
          title="Academic Journey"
          subtitle="Where the foundations came from."
        />

        <div className="edu-grid">
          {education.map((e, i) => (
            <div
              key={e.id}
              className="edu-card glass-card"
              style={{ '--clr': e.color }}
              data-aos="fade-up"
              data-aos-delay={i * 130}
            >
              {/* Gradient bar */}
              <div className="edu-bar" style={{ background: e.color }} />

              {/* Inner */}
              <div className="edu-inner">
                {/* Icon + Level */}
                <div className="edu-top">
                  <div
                    className="edu-icon-wrap"
                    style={{
                      background: `color-mix(in srgb, ${e.color} 12%, transparent)`,
                      borderColor: `color-mix(in srgb, ${e.color} 30%, transparent)`,
                    }}
                  >
                    <span style={{ color: e.color }}><FiAward /></span>
                  </div>
                  <div>
                    <span className="edu-level" style={{ color: e.color }}>{e.level}</span>
                    <div className="edu-period">
                      <FiCalendar style={{ fontSize: '0.75rem' }} />{' '}
                      {e.periodLabel || formatDateRange(e.start, e.end)}
                    </div>
                  </div>
                </div>

                {/* Degree */}
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-institution">{e.institution}</p>
                <p className="edu-desc">{e.focus}</p>

                {/* Grade */}
                {e.grade && (
                  <div
                    className="edu-score-wrap"
                    style={{ borderColor: `color-mix(in srgb, ${e.color} 30%, transparent)` }}
                  >
                    <span className="edu-score-label">{e.gradeLabel}</span>
                    <span className="edu-score" style={{ color: e.color }}>{e.grade}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
