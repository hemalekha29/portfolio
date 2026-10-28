import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FiCode, FiMenu, FiX } from 'react-icons/fi';
import { navigation } from '../../data/navigation';
import { profile } from '../../data/profile';
import '../../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close the mobile drawer on Escape or an outside click */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  /* Prevent the page behind the drawer from scrolling while it's open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={menuRef}>
      <div className="nav-container">
        {/* Logo */}
        <a href="#hero" className="nav-logo">
          <span className="logo-icon"><FiCode /></span>
          <span className="logo-text">
            <span className="logo-name">{profile.name}</span>
            <span className="logo-dot">.</span>
            <span className="logo-ext">dev</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navigation.map(({ to, label }) => (
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
        <button
          type="button"
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`}>
        {navigation.map(({ to, label, title }) => (
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
