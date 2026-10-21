import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, getCategories, sortProjects } from './filters.js';

const projects = [
  {
    slug: 'a',
    title: 'Clinical Practice Management Platform',
    summary: 'A clinic CRM',
    category: 'healthcare',
    type: 'in-house',
    order: 1,
    tags: ['React', 'MongoDB'],
    features: ['Appointment scheduling', 'Payroll'],
  },
  {
    slug: 'b',
    title: 'HR Management System',
    summary: 'Attendance and leave',
    category: 'operations',
    type: 'in-house',
    order: 2,
    tags: ['Express'],
    features: ['Payroll', 'Leave requests'],
  },
  {
    slug: 'c',
    title: 'Subwikha Hub',
    summary: 'An e-commerce storefront',
    category: 'ecommerce',
    type: 'personal',
    order: 3,
    tags: ['React', 'Firebase'],
    features: ['Cart and checkout'],
  },
];

test('getCategories returns each category with a count', () => {
  const categories = getCategories(projects);
  assert.equal(categories.length, 3);
  assert.deepEqual(
    categories.find(c => c.id === 'healthcare'),
    { id: 'healthcare', label: 'Healthcare', count: 1 },
  );
});

test('getCategories counts repeated categories', () => {
  const categories = getCategories([
    { category: 'healthcare' },
    { category: 'healthcare' },
    { category: 'ecommerce' },
  ]);
  assert.equal(categories.find(c => c.id === 'healthcare').count, 2);
  // Sorted by count descending.
  assert.equal(categories[0].id, 'healthcare');
});

test('getCategories ignores projects with no category', () => {
  assert.deepEqual(getCategories([{ title: 'no category' }]), []);
  assert.deepEqual(getCategories([]), []);
});

test('filterProjects by category', () => {
  const result = filterProjects(projects, { category: 'ecommerce' });
  assert.equal(result.length, 1);
  assert.equal(result[0].slug, 'c');
});

test('the "all" category returns everything', () => {
  assert.equal(filterProjects(projects, { category: 'all' }).length, 3);
  assert.equal(filterProjects(projects, {}).length, 3);
});

test('filterProjects searches titles, tags and features', () => {
  assert.equal(filterProjects(projects, { query: 'mongodb' })[0].slug, 'a');
  assert.equal(filterProjects(projects, { query: 'payroll' }).length, 2);
  assert.equal(filterProjects(projects, { query: 'storefront' })[0].slug, 'c');
});

test('the search is case-insensitive and trimmed', () => {
  assert.equal(filterProjects(projects, { query: '  MONGODB  ' }).length, 1);
});

test('a query that matches nothing returns an empty list', () => {
  assert.deepEqual(filterProjects(projects, { query: 'kubernetes' }), []);
});

test('category and query combine', () => {
  const result = filterProjects(projects, { category: 'healthcare', query: 'mongodb' });
  assert.equal(result.length, 1);
  assert.equal(filterProjects(projects, { category: 'ecommerce', query: 'mongodb' }).length, 0);
});

test('filterProjects handles empty and missing input safely', () => {
  assert.deepEqual(filterProjects([], { query: 'anything' }), []);
  assert.deepEqual(filterProjects(undefined), []);
});

test('sortProjects orders by the order field, then title', () => {
  const sorted = sortProjects([
    { slug: 'z', title: 'Zebra', order: 3 },
    { slug: 'a', title: 'Apple', order: 1 },
    { slug: 'm', title: 'Mango', order: 2 },
  ]);
  assert.deepEqual(sorted.map(p => p.slug), ['a', 'm', 'z']);
});

test('sortProjects puts unordered items last', () => {
  const sorted = sortProjects([
    { slug: 'none', title: 'No order' },
    { slug: 'first', title: 'First', order: 1 },
  ]);
  assert.deepEqual(sorted.map(p => p.slug), ['first', 'none']);
});
