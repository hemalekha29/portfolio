import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import { FiArrowDown, FiMail, FiDownload } from 'react-icons/fi';
import '../../styles/Hero.css';
import { useExperience } from '../../hooks/useExperience';
import { projects } from '../../data/projects';
import { techCount } from '../../data/skills';
import { profile } from '../../data/profile';
import { socialLinks } from '../../data/socialLinks';

const heroSocials = socialLinks.filter(link =>
  ['linkedin', 'github', 'email'].includes(link.id),
);

const roles = [
  profile.title,
  'Full Stack Web Developer',
  'React.js & TypeScript Developer',
  'Node.js & MongoDB Developer',
  'Software Development & Bug Fixing',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const canvasRef = useRef(null);
  const [photoFailed, setPhotoFailed] = useState(false);
  const { label, summary } = useExperience();

  /* Typewriter — `displayed` is derived, never stored */
  const displayed = roles[roleIdx].slice(0, charIdx);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), 70);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), 40);
    } else if (deleting && charIdx === 0) {
      // Async so the state update doesn't cascade within the effect body.
      timeout = setTimeout(() => {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % roles.length);
      }, 400);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx.fill();
      });
      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-inner container">
      <div className="hero-content">
        <div className="hero-badge" data-aos="fade-down">
          <span className="badge-dot" />
          <span>{profile.availability.label}</span>
        </div>

        <h1 className="hero-name" data-aos="fade-up" data-aos-delay="100">
          <span className="name-greeting">Hi, I'm </span>
          <span className="name-main">{profile.name}</span>
        </h1>

        <div className="hero-role" data-aos="fade-up" data-aos-delay="200">
          <span className="role-prefix">{'<'}</span>
          <span className="role-text">{displayed}</span>
          <span className="role-cursor">|</span>
          <span className="role-prefix">{' />'}</span>
        </div>

        <p className="hero-bio" data-aos="fade-up" data-aos-delay="300">
          MERN Stack Developer building <span className="grad">scalable web applications</span> with
          React.js, Node.js, Express.js &amp; MongoDB. I develop healthcare and
          practice-management systems — scheduling engines, role-based access and
          payroll — where correctness under concurrency matters more than anything else.
        </p>

        <div className="hero-actions" data-aos="fade-up" data-aos-delay="400">
          <Link to="projects" smooth duration={600} offset={-70}>
            <button className="btn-primary">
              View My Projects
            </button>
          </Link>
          <a href={profile.resume.path} download={profile.resume.fileName} className="btn-outline">
            <FiDownload /> {profile.resume.label}
          </a>
          <Link to="contact" smooth duration={600} offset={-70}>
            <button className="btn-outline">
              <FiMail /> Contact Me
            </button>
          </Link>
        </div>

        <div className="hero-socials" data-aos="fade-up" data-aos-delay="500">
          {heroSocials.map(link => (
            <a
              key={link.id}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="social-icon"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="hero-stats" data-aos="fade-up" data-aos-delay="600">
          {[
            summary,
            { num: `${projects.length}+`, label: 'Projects Built' },
            { num: `${techCount}+`,     label: 'Tech Stack' },
          ].map(({ num, label }) => (
            <div key={label} className="stat-item">
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

        {/* Portrait */}
        <div className="hero-visual">
        <figure className="hero-figure" data-aos="fade-left" data-aos-delay="200">
          <div className="photo-frame">
            {!photoFailed && (
              <img
                src={profile.image}
                alt={profile.imageAlt}
                className="hero-photo"
                width="1086"
                height="1448"
                loading="eager"
                decoding="async"
                onError={() => setPhotoFailed(true)}
              />
            )}
            {photoFailed && (
              <div className="photo-fallback" role="img" aria-label="Profile photo unavailable">
                <span className="photo-initials">HS</span>
              </div>
            )}
          </div>
          <figcaption className="photo-caption">
            <span className="photo-dot" />
            {summary.num} {summary.label}
          </figcaption>
        </figure>

      {/* Decorative code block */}
      <div className="hero-code-block" data-aos="fade-left" data-aos-delay="300">
        <div className="code-header">
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
          <span className="code-file">profile.js</span>
        </div>
        <pre className="code-body">{`const hemalekha = {
  role: "MERN Developer",
  exp: "${label}",
  stack: [
    "React", "Node",
    "Express", "MongoDB"
  ],
  status: "open_to_work",
  passion: "clean_code",
};`}</pre>
      </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <Link to="about" smooth duration={600} offset={-70} className="scroll-down">
        <span>scroll</span>
        <FiArrowDown className="scroll-arrow" />
      </Link>
    </section>
  );
}
