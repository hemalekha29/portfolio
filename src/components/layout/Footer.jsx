import { Link } from 'react-scroll';
import { FiHeart, FiCode } from 'react-icons/fi';
import { navigation } from '../../data/navigation';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/socialLinks';
import '../../styles/Footer.css';

const footerSocials = socialLinks.filter(link => ['linkedin', 'github', 'email'].includes(link.id));
const contactLinks = socialLinks.filter(link => ['email', 'phone', 'location'].includes(link.id));

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
              <span className="fl-name">{profile.name}</span>
              <span className="fl-dot">.</span>
              <span className="fl-ext">dev</span>
            </span>
          </a>
          <p className="footer-tagline">
            Building scalable web apps with the MERN stack.<br />
            Let's turn ideas into reality.
          </p>
          <div className="footer-socials">
            {footerSocials.map(link => (
              <a
                key={link.id}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="fs-btn"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="footer-nav" aria-label="Footer navigation">
          <span className="footer-nav-title">Navigation</span>
          <ul>
            {navigation.map(({ to, label }) => (
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
          {contactLinks.map(link => (
            link.href ? (
              <a key={link.id} href={link.href} className="footer-contact-item">
                {link.icon} {link.handle}
              </a>
            ) : (
              <span key={link.id} className="footer-contact-item">
                {link.icon} {link.handle}
              </span>
            )
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span className="footer-copy">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span className="footer-made">
            Made with <FiHeart className="heart" /> using React &amp; Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
