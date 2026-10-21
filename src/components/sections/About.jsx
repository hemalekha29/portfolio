import { useState } from 'react';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTypescript } from 'react-icons/si';
import '../../styles/About.css';
import { useExperience } from '../../hooks/useExperience';
import { profile } from '../../data/profile';
import { socialLinks, contactSocialIds } from '../../data/socialLinks';
import SectionHeader from '../ui/SectionHeader';

const contactInfo = socialLinks.filter(link => contactSocialIds.includes(link.id));
const profileLinks = socialLinks.filter(link => ['linkedin', 'github'].includes(link.id));

/** Icon + accent colour for each technology in the hero stack. */
const stackIcons = {
  MongoDB: { icon: <SiMongodb />, color: '#47A248' },
  'Express.js': { icon: <SiExpress />, color: '#ffffff' },
  React: { icon: <SiReact />, color: '#61DAFB' },
  'Node.js': { icon: <SiNodedotjs />, color: '#8CC84B' },
  TypeScript: { icon: <SiTypescript />, color: '#3178C6' },
  JavaScript: { icon: <SiNodedotjs />, color: '#F7DF1E' },
};

const stack = profile.stack
  .filter(item => stackIcons[item])
  .map(item => ({ label: item, ...stackIcons[item] }));

export default function About() {
  const { label, sentence } = useExperience();
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <SectionHeader
          tag="// about.me"
          title="Who Am I?"
          subtitle="A developer who works on the parts of a system that are hard to get right."
        />

        <div className="about-grid">
          {/* Left – avatar & stack */}
          <div className="about-left" data-aos="fade-right">
            <div className="avatar-wrapper">
              <div className="avatar-ring" />
              <div className="avatar-inner">
                {!photoFailed ? (
                  <img
                    className="avatar-photo"
                    src={profile.image}
                    alt={profile.imageAlt}
                    loading="lazy"
                    decoding="async"
                    onError={() => setPhotoFailed(true)}
                  />
                ) : (
                  <span className="avatar-initials">HS</span>
                )}
              </div>
              <div className="avatar-badge">
                <span>{profile.title}</span>
              </div>

              {/* Floating stack icons */}
              {stack.map(({ icon, label: tech, color }, i) => (
                <div
                  key={tech}
                  className={`float-icon fi-${i}`}
                  style={{ '--clr': color }}
                  title={tech}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* MERN stack pills */}
            <div className="stack-pills">
              {stack.map(({ icon, label: tech, color }) => (
                <span key={tech} className="stack-pill" style={{ '--clr': color }}>
                  {icon} {tech}
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
              I'm a <strong>MERN Stack Developer</strong> with <strong>{label} of hands-on work</strong> building
              production web applications. At <span className="highlight">Eethal Nad IT Solutions</span> I work
              across React front ends and Express back ends — healthcare and practice-management systems where
              scheduling, authentication and data isolation are the hard parts, not the forms.
            </p>

            <p className="about-text">
              Most of my work has been in healthcare software: clinic and practice management, consultation
              booking, and HR and payroll systems. The interesting problems are usually the unglamorous ones —
              preventing two people from booking the same slot, deriving attendance instead of storing it, and
              making a manual adjustment to a payslip auditable a month later. I like working on those, because
              they are where a system either holds up or quietly corrupts data.
            </p>

            <p className="about-text">
              My journey began with frontend development at{' '}
              <span className="highlight">Favor Web Development</span>, where I built reusable React components
              and improved application efficiency.
            </p>

            <p className="about-recruiter-note">{sentence}</p>

            <div className="info-list">
              {contactInfo.map(({ icon, label: itemLabel, handle, href }) => (
                <div key={itemLabel} className="info-item glass-card">
                  <span className="info-icon">{icon}</span>
                  <div>
                    <span className="info-label">{itemLabel}</span>
                    {href
                      ? <a href={href} className="info-value link">{handle}</a>
                      : <span className="info-value">{handle}</span>}
                  </div>
                </div>
              ))}
              {profileLinks.map(({ id, icon, label: itemLabel, href, handle }) => (
                <div key={id} className="info-item glass-card">
                  <span className="info-icon">{icon}</span>
                  <div>
                    <span className="info-label">{itemLabel}</span>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="info-value link"
                    >
                      {handle}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p className="about-close">&#125;;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
