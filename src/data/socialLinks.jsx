/**
 * Social and contact links.
 *
 * Referenced by id from other data files and components so a URL is only
 * defined once. `icon` is a react-icons component.
 */

import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'hemalekha29',
    href: 'https://github.com/hemalekha29',
    icon: <FiGithub />,
    color: '#e2e8f0',
    primary: true,
    external: true,
    note: 'Source code and experiments',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'hema-lekha-s',
    href: 'https://www.linkedin.com/in/hema-lekha-s-91521825b',
    icon: <FiLinkedin />,
    color: '#00d4ff',
    primary: true,
    external: true,
    note: 'Professional profile and work history',
  },
  {
    id: 'email',
    label: 'Email',
    handle: 'hemalekha4@gmail.com',
    href: 'mailto:hemalekha4@gmail.com',
    icon: <FiMail />,
    color: '#f72585',
    primary: true,
    external: false,
    note: 'Typically replies within 24h',
  },
  {
    id: 'phone',
    label: 'Phone',
    handle: '+91 6374852487',
    href: 'tel:+916374852487',
    icon: <FiPhone />,
    color: '#7c3aed',
    primary: false,
    external: false,
    note: 'Mon – Sat, 9am – 6pm IST',
  },
  {
    id: 'location',
    label: 'Location',
    handle: 'Coimbatore, India',
    href: null,
    icon: <FiMapPin />,
    color: '#06ffa5',
    primary: false,
    external: false,
    note: 'Open to remote work',
  },
];

/** Look up a single link by id. */
export const getSocialLink = (id) => socialLinks.find((link) => link.id === id) || null;

/** Links rendered as a row of icon buttons (hero, footer). */
export const iconSocialIds = ['linkedin', 'github', 'email'];

/** Links rendered as a labelled contact list (about, contact). */
export const contactSocialIds = ['email', 'phone', 'location'];

export default socialLinks;
