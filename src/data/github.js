/**
 * The GitHub account.
 *
 * One place to set it. With `username` empty, every part of the site that
 * points at GitHub — the social button, the Open Source section and the
 * repository links on the project cards — hides itself rather than
 * rendering a link to nowhere. Paste the new username here and the whole
 * site comes back, with the same content it had before.
 *
 * Nothing else in the codebase should hardcode a GitHub username.
 */

export const GITHUB = {
  /**
   * The account name, e.g. "octocat". Empty means "not published here" — the
   * social button, the Open Source section and the repository links on the
   * project cards all hide themselves.
   *
   * Change this one line to point the whole site at a different account.
   */
  username: 'hemalekha29',
};

/** Whether a GitHub account is configured. */
export const hasGitHub = () => Boolean(GITHUB.username);

/** The profile URL, or null when no account is configured. */
export const githubProfileUrl = () =>
  hasGitHub() ? `https://github.com/${GITHUB.username}` : null;

/**
 * The URL of one of the account's repositories.
 * @param {string} repo the repository name
 * @returns {string|null} null when no account is configured
 */
export const githubRepoUrl = (repo) =>
  hasGitHub() ? `https://github.com/${GITHUB.username}/${repo}` : null;

/**
 * The GitHub Pages URL of a repository.
 * @param {string} repo the repository name
 * @returns {string|null} null when no account is configured
 */
export const githubPagesUrl = (repo) =>
  hasGitHub() ? `https://${GITHUB.username}.github.io/${repo}/` : null;

export default GITHUB;
