import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiCode } from 'react-icons/fi';
import '../styles/Footer.css';

const links = [
  { to: 'hero',       label: '_init()' },
  { to: 'about',      label: 'about.me' },
  { to: 'skills',     label: 'skills[]' },
  { to: 'experience', label: './experience' },
  { to: 'projects',   label: 'projects{}' },
  { to: 'education',  label: 'education()' },
  { to: 'contact',    label: 'hire_me()' },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top separator */}
      <div className="footer-sep" />

      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a href="#hero" className="footer-logo">
            <span className="fl-icon"><FiCode /></span>
            <span>
              <span className="fl-name">Hemalekha S</span>
              <span className="fl-dot">.</span>
              <span className="fl-ext">dev</span>
            </span>
          </a>
          <p className="footer-tagline">
            Building scalable web apps with the MERN stack.<br />
            Let's turn ideas into reality.
          </p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/hema-lekha-s-91521825b" target="_blank" rel="noreferrer" className="fs-btn" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://github.com/hemalekha29" target="_blank" rel="noreferrer" className="fs-btn" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="mailto:hemalekha4@gmail.com" className="fs-btn" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        {/* Nav */}
        <nav className="footer-nav">
          <span className="footer-nav-title">Navigation</span>
          <ul>
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} smooth duration={600} offset={-70} className="footer-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="footer-contact">
          <span className="footer-nav-title">Contact</span>
          <a href="mailto:hemalekha4@gmail.com" className="footer-contact-item">
            <FiMail /> hemalekha4@gmail.com
          </a>
          <a href="tel:+916374852487" className="footer-contact-item">
            +91 6374852487
          </a>
          <span className="footer-contact-item">
            Coimbatore, India
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span className="footer-copy">
            © {new Date().getFullYear()} Hemalekha S. All rights reserved.
          </span>
          <span className="footer-made">
            Made with <FiHeart className="heart" /> using React &amp; Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
