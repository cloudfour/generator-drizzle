'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-drizzle:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('creates files', function () {
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
