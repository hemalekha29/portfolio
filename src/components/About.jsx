import { FiMapPin, FiMail, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';
import '../styles/About.css';

const info = [
  { icon: <FiMapPin />, label: 'Location', value: 'Coimbatore, India' },
  { icon: <FiMail />,   label: 'Email',    value: 'hemalekha4@gmail.com', href: 'mailto:hemalekha4@gmail.com' },
  { icon: <FiPhone />,  label: 'Phone',    value: '+91 6374852487', href: 'tel:+916374852487' },
];

const stack = [
  { icon: <SiMongodb />,  label: 'MongoDB',   color: '#47A248' },
  { icon: <SiExpress />,  label: 'Express',   color: '#ffffff' },
  { icon: <SiReact />,    label: 'React',     color: '#61DAFB' },
  { icon: <SiNodedotjs />,label: 'Node.js',   color: '#8CC84B' },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-tag">// about.me</span>
          <h2 className="section-title">Who Am I?</h2>
          <div className="section-line" />
        </div>

        <div className="about-grid">
          {/* Left – avatar & stack */}
          <div className="about-left" data-aos="fade-right">
            <div className="avatar-wrapper">
              <div className="avatar-ring" />
              <div className="avatar-inner">
                <span className="avatar-initials">HS</span>
              </div>
              <div className="avatar-badge">
                <span>MERN Dev</span>
              </div>
              {/* Floating MERN icons */}
              {stack.map(({ icon, label, color }, i) => (
                <div
                  key={label}
                  className={`float-icon fi-${i}`}
                  style={{ '--clr': color }}
                  title={label}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* MERN stack pills */}
            <div className="stack-pills">
              {stack.map(({ icon, label, color }) => (
                <span key={label} className="stack-pill" style={{ '--clr': color }}>
                  {icon} {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right – text & info */}
          <div className="about-right" data-aos="fade-left">
            <p className="about-subtitle">
              <span className="grad">const</span> bio = &#123;
            </p>

            <p className="about-text">
              I'm a <strong>MERN Stack Developer</strong> with <strong>7 months of hands-on experience</strong> building
              scalable full-stack web applications. Currently working at{' '}
              <span className="highlight">Eethal Nad IT Solutions</span>, I develop responsive and interactive
              interfaces, integrate REST APIs, manage backend functionality, and optimize performance.
            </p>

            <p className="about-text">
              My journey began with frontend development at{' '}
              <span className="highlight">Favor Web Development</span>, where I built reusable React components
              and improved application efficiency. I'm passionate about writing clean, user-focused code that
              delivers real value.
            </p>

            <div className="info-list">
              {info.map(({ icon, label, value, href }) => (
                <div key={label} className="info-item glass-card">
                  <span className="info-icon">{icon}</span>
                  <div>
                    <span className="info-label">{label}</span>
                    {href
                      ? <a href={href} className="info-value link">{value}</a>
                      : <span className="info-value">{value}</span>
                    }
                  </div>
                </div>
              ))}
              <div className="info-item glass-card">
                <span className="info-icon"><FiLinkedin /></span>
                <div>
                  <span className="info-label">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/hema-lekha-s-91521825b"
                    target="_blank" rel="noreferrer"
                    className="info-value link"
                  >
                    hema-lekha-s
                  </a>
                </div>
              </div>
              <div className="info-item glass-card">
                <span className="info-icon"><FiGithub /></span>
                <div>
                  <span className="info-label">GitHub</span>
                  <a
                    href="https://github.com/hemalekha29"
                    target="_blank" rel="noreferrer"
                    className="info-value link"
                  >
                    hemalekha29
                  </a>
                </div>
              </div>
            </div>

            <p className="about-close">&#125;;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
