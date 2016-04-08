'use strict';

const chalk = require('chalk');

const INTRO = `
${chalk.bold.underline('Welcome to your new Drizzle project.')}
${chalk.dim('Beginning setup phase...')}
`;

const PROMPT_MODE_CHOICE = 'Setup';
const PROMPT_TITLE_INPUT = 'Title';
const PROMPT_DESCRIPTION_INPUT = 'Description';
const PROMPT_AUTHOR_INPUT = 'Author';
const PROMPT_NODEV_INPUT = 'Node version for package.json';
const PROMPT_REPO_INPUT = 'Repository for package.json';
const PROMPT_INSTALL_CHOICE = 'Include optional packages?';

const PROMPT_POLYFILL_CONFIRM =
  `Include ${chalk.underline('polyfills.io')} <script>?`;

const PROMPT_SERVICEWORKER_CONFIRM =
  `Include ${chalk.underline('service-worker.js')} <script>?`;

module.exports = {
  INTRO,
  PROMPT_MODE_CHOICE,
  PROMPT_TITLE_INPUT,
  PROMPT_DESCRIPTION_INPUT,
  PROMPT_AUTHOR_INPUT,
  PROMPT_NODEV_INPUT,
  PROMPT_REPO_INPUT,
  PROMPT_INSTALL_CHOICE,
  PROMPT_POLYFILL_CONFIRM,
  PROMPT_SERVICEWORKER_CONFIRM
};
