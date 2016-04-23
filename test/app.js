'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-drizzle:app', () => {
  before(done => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', () => {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.github',
      '.gitignore',
      '.nvmrc',
      'browserslist',
      'config.js',
      'gulpfile.js',
      'package.json',
      'README.md',
      'src'
    ]);
  });
});
