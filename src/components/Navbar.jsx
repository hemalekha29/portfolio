import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiCode, FiMenu, FiX } from 'react-icons/fi';
import '../styles/Navbar.css';

const navLinks = [
  { to: 'hero',       label: '_init()',       title: 'Home' },
  { to: 'about',      label: 'about.me',      title: 'About' },
  { to: 'skills',     label: 'skills[]',      title: 'Skills' },
  { to: 'experience', label: './experience',  title: 'Experience' },
  { to: 'projects',   label: 'projects{}',    title: 'Projects' },
  { to: 'education',  label: 'education()',   title: 'Education' },
  { to: 'contact',    label: 'hire_me()',     title: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('hero');
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <a href="#hero" className="nav-logo">
          <span className="logo-icon"><FiCode /></span>
          <span className="logo-text">
            <span className="logo-name">Hemalekha S</span>
            <span className="logo-dot">.</span>
            <span className="logo-ext">dev</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                spy smooth duration={600}
                offset={-70}
                onSetActive={() => setActive(to)}
                className={`nav-link ${active === to ? 'active' : ''}`}
              >
                <span className="link-text">{label}</span>
                <span className="link-bar" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {navLinks.map(({ to, label, title }) => (
          <Link
            key={to}
            to={to}
            spy smooth duration={600}
            offset={-70}
            className="mobile-link"
            onClick={() => setOpen(false)}
          >
            <span className="mobile-label">{label}</span>
            <span className="mobile-title">{title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
