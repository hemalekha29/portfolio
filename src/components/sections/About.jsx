import { useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
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
          {/* Left – workspace photograph & stack */}
          <div className="about-left" data-aos="fade-right">
            <figure
              className="workspace-figure"
              data-mern-zone
              data-mern-stack={profile.stack.join('|')}
            >
              <div className="workspace-stage">
                <div className="workspace-frame">
                  {!photoFailed ? (
                    <img
                      className="workspace-photo"
                      src={profile.workspaceImage}
                      alt={profile.workspaceImageAlt}
                      width="1672"
                      height="941"
                      loading="lazy"
                      decoding="async"
                      onError={() => setPhotoFailed(true)}
                    />
                  ) : (
                    <div className="workspace-fallback" role="img" aria-label="Photograph unavailable">
                      <span>HS</span>
                    </div>
                  )}
                </div>

                {/* The stack, floating around the frame — the same treatment
                    the portrait used to have, arranged around a landscape
                    frame instead of a circle. */}
                {stack.map(({ icon, label: tech, color }, i) => (
                  <span
                    key={tech}
                    className={`float-icon fi-${i}`}
                    style={{ '--clr': color }}
                    title={tech}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                ))}
              </div>
              <figcaption className="workspace-caption">
                <span className="workspace-dot" />
                {profile.title}
              </figcaption>
            </figure>

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
              production web applications. At{' '}
              <a
                className="company-link"
                href={profile.currentCompany.url}
                target="_blank"
                rel="noreferrer"
              >
                {profile.currentCompany.name}
                <FiExternalLink className="company-link-icon" aria-hidden="true" />
              </a>{' '}
              I work across React front ends and Express back ends — healthcare and practice-management systems
              where scheduling, authentication and data isolation are the hard parts, not the forms.
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
