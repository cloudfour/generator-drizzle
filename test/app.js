'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const GENERATOR_PATH = path.join(__dirname, '../generators/app');

describe('generator-drizzle:app', () => {
  const answerFixture = {
    title: 'Test title',
    description: 'Test description'
  };

  before(done => {
    helpers.run(GENERATOR_PATH)
      .withPrompts(answerFixture)
      .on('end', done);
  });

  it('Creates expected files', () => {
    assert.file([
      '.babelrc',
      '.editorconfig',
      '.eslintrc',
      '.github',
      '.gitignore',
      '.nvmrc',
      '.github/ISSUE_TEMPLATE.md',
      '.github/PULL_REQUEST_TEMPLATE.md',
      'browserslist',
      'config.js',
      'gulpfile.js',
      'package.json',
      'README.md',
      'src'
    ]);
  });

  it('Creates a README with rendered content', () => {
    assert.fileContent([
      ['README.md', `# ${answerFixture.title}`]
    ]);
  });
});
