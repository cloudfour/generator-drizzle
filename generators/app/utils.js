'use strict';

const R = require('ramda');

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
const toSlug = R.pipe(
  R.toLower,
  // Replace accent chars (TODO: needed?)
  R.replace(/[\u00C0-\u00C5]/ig, 'a'),
  R.replace(/[\u00C8-\u00CB]/ig, 'e'),
  R.replace(/[\u00CC-\u00CF]/ig, 'i'),
  R.replace(/[\u00D2-\u00D6]/ig, 'o'),
  R.replace(/[\u00D9-\u00DC]/ig, 'u'),
  R.replace(/[\u00D1]/ig, 'n'),
  R.replace(/[^a-z0-9 ]+/gi, ''),
  R.trim,
  R.replace(/\s/g, '-'),
  R.replace(/[\-]{2}/g, ''),
  R.replace(/[^a-z\- ]*/gi, '')
);

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
  toSlug,
  toTitle
};
