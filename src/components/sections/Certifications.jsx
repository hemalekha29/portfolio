import { useState } from 'react';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { certifications } from '../../data/certifications';
import { formatMonthYear } from '../../utils/date';
import SectionHeader from '../ui/SectionHeader';
import '../../styles/Certifications.css';

/**
 * Certifications section.
 *
 * Renders nothing while the certifications list is empty — an empty section
 * would be padding rather than content. Add a record to
 * `src/data/certifications.js` and the section appears on its own.
 */
export default function Certifications() {
  // Certificate images that failed to load fall back to the award icon.
  const [imageFailed, setImageFailed] = useState(() => new Set());

  if (!certifications.length) return null;

  return (
    <section id="certifications" className="cert-section">
      <div className="container">
        <SectionHeader
          tag="// certifications[]"
          title="Certifications"
          subtitle="Verified courses and credentials, with the certificate images."
        />

        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <article
              key={cert.id}
              className="cert-card glass-card"
              style={{ '--clr': cert.color || '#00d4ff' }}
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              {cert.image && !imageFailed.has(cert.id) ? (
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-thumb"
                  aria-label={`Open the ${cert.name} certificate in full`}
                >
                  <img
                    className="cert-image"
                    src={cert.image}
                    alt={`${cert.name} certificate issued by ${cert.issuer}`}
                    loading="lazy"
                    decoding="async"
                    onError={() =>
                      setImageFailed(prev => new Set(prev).add(cert.id))
                    }
                  />
                </a>
              ) : (
                <span className="cert-icon" style={{ color: cert.color || '#00d4ff' }}>
                  <FiAward />
                </span>
              )}

              <div className="cert-body">
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-meta">
                  {cert.issued && (
                    <span className="cert-issued">{formatMonthYear(cert.issued)}</span>
                  )}
                  {cert.credentialId && (
                    <span className="cert-credential">ID: {cert.credentialId}</span>
                  )}
                </div>
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-link"
                  aria-label={`View ${cert.name} credential`}
                >
                  <FiExternalLink />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
