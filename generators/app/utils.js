'use strict';

const R = require('ramda');
const slug = require('slug');

/**
 * Turn a string into a nice title.
 * @param {String}
 * @returns {String}
 * @example toTitle('some-slug_string'); => Some Slug String
 */
const toTitle = R.pipe(
  // String => Array
  R.split(/[\W_]+/),
  // Array => Array
  R.map(word => word.replace(/^\w/, R.toUpper)),
  // Array => String
  R.join(' ')
);

/**
 * Turn a string into a slug.
 * Inspired by https://gist.github.com/juanmhidalgo/3146760
 * @param {String}
 * @returns {String}
 * @example toSlug('Nice Title!'); => nice-title
 */
const toSlug = R.pipe(R.toLower, slug);

/**
 * Creates a GitHub repository URL.
 * @param {String} org
 * @param {String} name
 * @returns {String}
 * @example toGitHubUrl('foo', 'bar'); => git@github.com:foo/bar.git
 */
const toGitHubUrl = (org, name) => {
  return `git@github.com:${org}/${name}.git`;
};

/**
 * Is a string a valid "slug"?
 * @param {String}
 * @returns {Boolean}
 * @example isSlug('no way Jose'); => false
 */
const isSlug = R.test(/^[a-z]{1}[a-z0-9\-]*[^\-]$/);

/**
 * Is an object's `length` sufficient?
 * @param {Number}
 * @param {Array|String}
 * @returns {Boolean}
 * @example isLongAs(3, [1,2,3]); => true
 * @example isLongAs(5, 'abcde'); => true
 * @example isLongAs(4, [1,2,3]); => false
 */
const isLongAs = R.curry((len, obj) => obj.length >= len);

module.exports = {
  isLongAs,
  isSlug,
  toGitHubUrl,
  toSlug,
  toTitle
};
