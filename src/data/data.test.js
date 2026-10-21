import test from 'node:test';
import assert from 'node:assert/strict';
import { profile } from './profile.js';
import { employment } from './experience.js';
import { education } from './education.js';
import { navigation } from './navigation.js';
import { certifications } from './certifications.js';
import { parseDate } from '../utils/date.js';

test('the profile has every field the site depends on', () => {
  for (const key of ['name', 'title', 'email', 'image', 'imageAlt', 'summary', 'headline']) {
    assert.ok(profile[key], `profile.${key} is required`);
  }
  assert.ok(profile.resume?.path, 'profile.resume.path is required');
  assert.ok(profile.resume?.fileName, 'profile.resume.fileName is required');
  assert.ok(profile.seo?.title, 'profile.seo.title is required');
  assert.ok(profile.seo?.description, 'profile.seo.description is required');
  assert.ok(Array.isArray(profile.stack) && profile.stack.length > 0, 'profile.stack is required');
});

test('the email address is well formed', () => {
  assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
});

test('the current role id points at a real employment record', () => {
  const match = employment.find(role => role.id === profile.currentRoleId);
  assert.ok(match, `no employment record with id "${profile.currentRoleId}"`);
  assert.equal(match.current, true);
});

test('exactly one role is flagged as current', () => {
  const current = employment.filter(role => role.current);
  assert.equal(current.length, 1);
});

test('every employment record has the fields the timeline renders', () => {
  for (const role of employment) {
    assert.ok(role.id, 'id is required');
    assert.ok(role.company, `${role.id}: company is required`);
    assert.ok(role.title, `${role.id}: title is required`);
    assert.ok(role.location, `${role.id}: location is required`);
    assert.ok(role.type, `${role.id}: type is required`);
    assert.ok(Array.isArray(role.responsibilities) && role.responsibilities.length > 0,
      `${role.id}: responsibilities are required`);
    assert.ok(Array.isArray(role.technologies), `${role.id}: technologies must be an array`);
  }
});

test('employment ids are unique', () => {
  const ids = employment.map(role => role.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('configured employment dates are valid and ordered', () => {
  for (const role of employment) {
    if (role.start) {
      const start = parseDate(role.start);
      if (role.end) {
        const end = parseDate(role.end);
        assert.ok(end >= start, `${role.id}: end date precedes the start date`);
      }
    } else {
      // A record without dates must say so, so the UI can fall back.
      assert.ok(role.periodLabel, `${role.id}: needs periodLabel when start is missing`);
    }
  }
});

test('a current role has no end date', () => {
  for (const role of employment) {
    if (role.current) assert.equal(role.end, undefined, `${role.id}: a current role should not have an end date`);
  }
});

test('every education record has the fields the card renders', () => {
  for (const record of education) {
    assert.ok(record.id, 'id is required');
    assert.ok(record.degree, `${record.id}: degree is required`);
    assert.ok(record.institution, `${record.id}: institution is required`);
    assert.ok(record.level, `${record.id}: level is required`);
    assert.ok(record.focus, `${record.id}: focus is required`);
  }
});

test('education ids are unique', () => {
  const ids = education.map(record => record.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('navigation covers the sections the site renders', () => {
  const targets = navigation.map(item => item.to);
  for (const required of ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact']) {
    assert.ok(targets.includes(required), `navigation is missing "${required}"`);
  }
  for (const item of navigation) {
    assert.ok(item.label, `${item.id}: label is required`);
    assert.ok(item.title, `${item.id}: title is required`);
  }
});

test('the certifications list is an array and stays valid if populated', () => {
  assert.ok(Array.isArray(certifications));
  for (const cert of certifications) {
    assert.ok(cert.id, 'id is required');
    assert.ok(cert.name, `${cert.id}: name is required`);
    assert.ok(cert.issuer, `${cert.id}: issuer is required`);
  }
});
