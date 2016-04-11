/* eslint-env mocha */

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

  it('Creates a valid package.json', () => {
    assert.jsonFileContent('package.json', {
      description: answerFixture.description
    });
  });

  it('Creates a README', () => {
    assert.fileContent([
      ['README.md', `# ${answerFixture.title}`]
    ]);
  });

  it('Creates GitHub templates', () => {
    assert.file([
      '.github/ISSUE_TEMPLATE.md',
      '.github/PULL_REQUEST_TEMPLATE.md'
    ]);
  });
});
