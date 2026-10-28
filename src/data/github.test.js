import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GITHUB,
  githubPagesUrl,
  githubProfileUrl,
  githubRepoUrl,
  hasGitHub,
} from './github.js';
import { repositories } from './repositories.js';

/**
 * The GitHub account is configured in exactly one place. These tests cover
 * the behaviour of that switch, in both states, so the "hide it" path
 * cannot rot while the account is set.
 */

test('the account is a single value', () => {
  assert.equal(typeof GITHUB.username, 'string');
});

test('the account is either configured or deliberately empty', () => {
  assert.ok(
    GITHUB.username === '' || /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(GITHUB.username),
    'a GitHub username is empty or a valid account name',
  );
});

test('the profile URL is built from the account', () => {
  if (!hasGitHub()) {
    assert.equal(githubProfileUrl(), null);
    return;
  }
  assert.equal(githubProfileUrl(), `https://github.com/${GITHUB.username}`);
});

test('a repository URL is built from the account', () => {
  if (!hasGitHub()) {
    assert.equal(githubRepoUrl('anything'), null);
    return;
  }
  assert.equal(
    githubRepoUrl('portfolio'),
    `https://github.com/${GITHUB.username}/portfolio`,
  );
});

test('a GitHub Pages URL is built from the account', () => {
  if (!hasGitHub()) {
    assert.equal(githubPagesUrl('anything'), null);
    return;
  }
  assert.equal(
    githubPagesUrl('mini_social_media'),
    `https://${GITHUB.username}.github.io/mini_social_media/`,
  );
});

test('every repository resolves against the configured account', () => {
  assert.ok(repositories.length > 0, 'the Open Source section has content');
  for (const repo of repositories) {
    assert.ok(repo.id, 'id is required');
    assert.ok(repo.name, `${repo.id}: name is required`);
    assert.ok(repo.repo, `${repo.id}: the repository name is required`);
    assert.ok(repo.description, `${repo.id}: description is required`);
    assert.ok(repo.language, `${repo.id}: language is required`);

    if (!hasGitHub()) {
      assert.equal(repo.url, null, `${repo.id}: no account means no URL`);
      continue;
    }
    assert.equal(repo.url, `https://github.com/${GITHUB.username}/${repo.repo}`);
  }
});

test('no repository URL is left over from a previous account', () => {
  for (const repo of repositories) {
    if (!repo.url) continue;
    assert.ok(
      repo.url.startsWith(`https://github.com/${GITHUB.username}/`),
      `${repo.id}: ${repo.url} does not belong to the configured account`,
    );
  }
});
