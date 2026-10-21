/**
 * The header block used at the top of every section.
 * Keeps the tag / title / subtitle / rule consistent across the site.
 */
export default function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="section-header" data-aos="fade-up">
      <span className="section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
      <div className="section-line" />
    </div>
  );
}
