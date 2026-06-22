import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import '../styles/Experience.css';

const jobs = [
  {
    title: 'MERN Stack Developer',
    company: 'Eethal Nad IT Solutions',
    period: '2025 – Present',
    location: 'Coimbatore, India',
    type: 'Full-time',
    color: '#00d4ff',
    points: [
      'Developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js',
      'Designing responsive and interactive user interfaces to enhance user experience',
      'Integrating REST APIs and managing backend functionality efficiently',
      'Performing database operations, debugging, and performance optimization',
      'Handling client communication, requirement gathering, and development coordination',
      'Contributing to the complete software development lifecycle from planning to deployment',
    ],
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API'],
  },
  {
    title: 'Frontend Development Intern',
    company: 'Favor Web Development',
    period: '2025',
    location: 'Virudhunagar, India',
    type: 'Internship',
    color: '#7c3aed',
    points: [
      'Developed responsive web interfaces using React.js and JavaScript',
      'Built reusable React.js components and integrated REST APIs',
      'Improved application efficiency and user experience',
      'Collaborated on interface enhancements and frontend optimization',
    ],
    tags: ['React.js', 'JavaScript', 'REST API', 'CSS'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="exp-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">// ./experience</span>
          <h2 className="section-title">Work Experience</h2>
          <div className="section-line" />
        </div>

        <div className="timeline">
          {jobs.map((job, i) => (
            <div
              key={job.company}
              className="timeline-item"
              data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={i * 120}
            >
              {/* Connector */}
              <div className="timeline-connector">
                <div className="tl-dot" style={{ background: job.color, boxShadow: `0 0 16px ${job.color}` }} />
                {i < jobs.length - 1 && <div className="tl-line" />}
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
                    <span><FiCalendar /> {job.period}</span>
                    <span><FiMapPin /> {job.location}</span>
                  </div>
                </div>

                <ul className="exp-points">
                  {job.points.map(pt => (
                    <li key={pt}>
                      <span className="pt-arrow" style={{ color: job.color }}>›</span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="exp-tags">
                  {job.tags.map(tag => (
                    <span key={tag} className="exp-tag" style={{ '--clr': job.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
