import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import '../styles/Hero.css';

const roles = [
  'MERN Stack Developer',
  'Full Stack Web Developer',
  'React.js & Next.js Developer',
  'TypeScript | Node.js | MongoDB',
  'Software Development & Bug Fixing',
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const canvasRef = useRef(null);

  /* Typewriter */
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
      setDeleting(false);
      setRoleIdx(i => (i + 1) % roles.length);
    }
    setDisplayed(current.slice(0, charIdx));
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

      <div className="hero-content container">
        <div className="hero-badge" data-aos="fade-down">
          <span className="badge-dot" />
          <span>Available for opportunities</span>
        </div>

        <h1 className="hero-name" data-aos="fade-up" data-aos-delay="100">
          <span className="name-greeting">Hi, I'm </span>
          <span className="name-main">Hemalekha S</span>
        </h1>

        <div className="hero-role" data-aos="fade-up" data-aos-delay="200">
          <span className="role-prefix">{'<'}</span>
          <span className="role-text">{displayed}</span>
          <span className="role-cursor">|</span>
          <span className="role-prefix">{' />'}</span>
        </div>

        <p className="hero-bio" data-aos="fade-up" data-aos-delay="300">
          MERN Stack Developer crafting <span className="grad">scalable full-stack applications</span> with
          React.js, Node.js, Express.js &amp; MongoDB. Passionate about building
          efficient, user-focused web solutions.
        </p>

        <div className="hero-actions" data-aos="fade-up" data-aos-delay="400">
          <Link to="contact" smooth duration={600} offset={-70}>
            <button className="btn-primary">
              <FiMail /> Hire Me
            </button>
          </Link>
          <Link to="projects" smooth duration={600} offset={-70}>
            <button className="btn-outline">
              View Work
            </button>
          </Link>
        </div>

        <div className="hero-socials" data-aos="fade-up" data-aos-delay="500">
          <a href="https://www.linkedin.com/in/hema-lekha-s-91521825b" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="https://github.com/hemalekha29" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="mailto:hemalekha4@gmail.com" className="social-icon" aria-label="Email">
            <FiMail />
          </a>
        </div>

        <div className="hero-stats" data-aos="fade-up" data-aos-delay="600">
          {[
            { num: '7+',  label: 'Months Exp.' },
            { num: '3+',  label: 'Projects Built' },
            { num: '5+',  label: 'Tech Stack' },
          ].map(({ num, label }) => (
            <div key={label} className="stat-item">
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <Link to="about" smooth duration={600} offset={-70} className="scroll-down">
        <span>scroll</span>
        <FiArrowDown className="scroll-arrow" />
      </Link>

      {/* Decorative code block */}
      <div className="hero-code-block" data-aos="fade-left" data-aos-delay="300">
        <div className="code-header">
          <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
          <span className="code-file">profile.js</span>
        </div>
        <pre className="code-body">{`const hemalekha = {
  role: "MERN Developer",
  exp: "7+ months",
  stack: [
    "React", "Node",
    "Express", "MongoDB"
  ],
  status: "open_to_work",
  passion: "clean_code",
};`}</pre>
      </div>
    </section>
  );
}
