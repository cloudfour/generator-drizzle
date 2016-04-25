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

/**
 * Get the key of a key-value pair array ([0]).
 * This is useful for array mapping.
 * @param {Array}
 * @returns {String|Number}
 * @example pairKey(['apple', 'red']); // => apple
 */
const pairKey = R.prop(0);

/**
 * Get the value of a key-value pair array ([1]).
 * This is useful for array mapping.
 * @param {Array}
 * @returns {String|Number}
 * @example pairVal(['apple', 'red']); // => red
 */
const pairVal = R.prop(1);

/**
 * Group an array of objects by some common property.
 * @param {String}
 * @param {Array}
 * @returns {Object}
 * @example
 *   groupByProp('id', [{id: 'a'}, {id: 'b'}]);
 *   // => {a: [{id: 'a'}], b: [{id: 'b'}]}
 */
const groupByProp = R.curry(
  (prop, list) => R.groupBy(R.prop(prop), list)
);

/**
 * Group an array of key-value pairs by each value.
 * @param {Array}
 * @returns {Object}
 * @example
 *   groupByVal([[1, 'a'], [2, 'b']]);
 *   // => {a: [1, 'a'], b: [2, 'b']}
 */
const groupByVal = R.groupBy(pairVal);

module.exports = {
  concat: R.concat,
  groupByProp,
  groupByVal,
  isLongAs,
  isSlug,
  pairKey,
  pairVal,
  toGitHubUrl,
  toSlug,
  toTitle
};
