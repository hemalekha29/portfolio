import { Link } from 'react-scroll';
import { FiHome } from 'react-icons/fi';
import { navigation } from '../data/navigation';
import '../styles/NotFound.css';

/**
 * Shown for any path other than the site root.
 *
 * The site is a single-page scroll layout rather than a routed app, so this
 * is matched on the pathname in App.jsx rather than by a router.
 */
export default function NotFound() {
  const home = navigation.find(item => item.id === 'hero') || navigation[0];

  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1 className="not-found-title">This page does not exist</h1>
        <p className="not-found-text">
          The link may be out of date. Everything on this site is one page away.
        </p>
        <Link to={home.to} smooth duration={600} offset={-70} className="btn-primary not-found-btn">
          <FiHome /> Back to the homepage
        </Link>
      </div>
    </section>
  );
}
