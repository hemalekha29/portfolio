import { FiBook, FiAward, FiCalendar } from 'react-icons/fi';
import '../styles/Education.css';

const edu = [
  {
    degree: 'Bachelor of Computer Science',
    institution: 'Noble College of Arts and Science for Women',
    period: '2022 – 2025',
    score: 'CGPA: 7.67',
    scoreLabel: 'CGPA',
    level: 'Undergraduate',
    color: '#00d4ff',
    icon: <FiAward />,
    description: 'Specialized in Computer Science with focus on software development, data structures, algorithms, and web technologies.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'S.B.K. Girls\' Higher Secondary School',
    period: '2021 – 2022',
    score: '68.667%',
    scoreLabel: 'Percentage',
    level: 'Class XII',
    color: '#7c3aed',
    icon: <FiBook />,
    description: 'Completed Higher Secondary education with focus on Mathematics, Computer Science, and related subjects.',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'S.B.K. Girls\' Higher Secondary School',
    period: '2019 – 2020',
    score: '73.8%',
    scoreLabel: 'Percentage',
    level: 'Class X',
    color: '#f72585',
    icon: <FiBook />,
    description: 'Completed secondary schooling with strong foundation in core sciences and mathematics.',
  },
];

export default function Education() {
  return (
    <section id="education" className="edu-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">// education()</span>
          <h2 className="section-title">Academic Journey</h2>
          <div className="section-line" />
        </div>

        <div className="edu-grid">
          {edu.map((e, i) => (
            <div
              key={e.degree}
              className="edu-card glass-card"
              style={{ '--clr': e.color }}
              data-aos="fade-up"
              data-aos-delay={i * 130}
            >
              {/* Gradient bar */}
              <div className="edu-bar" style={{ background: e.color }} />

              <div className="edu-inner">
                {/* Icon + Level */}
                <div className="edu-top">
                  <div className="edu-icon-wrap" style={{ background: `color-mix(in srgb, ${e.color} 12%, transparent)`, borderColor: `color-mix(in srgb, ${e.color} 30%, transparent)` }}>
                    <span style={{ color: e.color }}>{e.icon}</span>
                  </div>
                  <div>
                    <span className="edu-level" style={{ color: e.color }}>{e.level}</span>
                    <div className="edu-period">
                      <FiCalendar style={{ fontSize: '0.75rem' }} /> {e.period}
                    </div>
                  </div>
                </div>

                {/* Degree */}
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-institution">{e.institution}</p>
                <p className="edu-desc">{e.description}</p>

                {/* Score */}
                <div className="edu-score-wrap" style={{ borderColor: `color-mix(in srgb, ${e.color} 30%, transparent)` }}>
                  <span className="edu-score-label">{e.scoreLabel}</span>
                  <span className="edu-score" style={{ color: e.color }}>{e.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
