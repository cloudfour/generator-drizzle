'use strict';

/**
 * Drizzle Project Yeoman Generator
 *
 * @example yo drizzle
 */

const chalk = require('chalk');
const inquirer = require('inquirer');
const yeoman = require('yeoman-generator');
const utils = require('./utils');

const INTRO = `
${chalk.bold.underline('Welcome to your new Drizzle project.')}
${chalk.dim('Beginning setup phase...')}
`;

const modes = [
  'easy',
  'detailed'
];

const nodeVersions = [
  '>=4.0.0',
  '>=5.0.0'
];

const dependencies = new Map([
  ['gsap', {type: 'js'}],
  ['jquery', {type: 'js'}],
  ['lodash', {type: 'js'}],
  ['moment', {type: 'js'}],
  ['ramda', {type: 'js'}],
  ['underscore', {type: 'js'}],
  ['postcss-easings', {type: 'postcss'}],
  ['postcss-mixins', {type: 'postcss'}],
  ['css-modularscale', {type: 'postcss'}]
]);

// This is merged into props after the prompt phase.
const computedProps = props => {
  return {
    slug: utils.toSlug(props.title)
  };
};

// Separator for list/checkbox prompts.
const separator = label =>
  new inquirer.Separator(`--- ${label} ---`);

// Used to decide which prompts to skip.
const isDetailedMode = answers =>
  answers.mode === 'detailed';

const prompts = [
  {
    name: 'mode',
    type: 'list',
    message: 'Setup',
    choices: modes
  },
  {
    name: 'title',
    type: 'input',
    message: 'Title',
    default: 'Untitled Drizzle Project',
    validate (input) {
      return utils.isLongAs(2, input);
    }
  },
  {
    name: 'description',
    type: 'input',
    message: 'Description',
    default: 'A description of my project.',
    validate (input) {
      return utils.isLongAs(2, input);
    }
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author',
    default: 'Cloud Four',
    validate (input) {
      return utils.isLongAs(2, input);
    }
  },
  {
    name: 'repository',
    type: 'input',
    message: 'Repository for package.json',
    default (answers) {
      return utils.toGitHubUrl(answers.author, answers.title);
    }
  },
  {
    name: 'nodeVersion',
    type: 'list',
    message: 'Node version for package.json',
    choices: nodeVersions,
    when: isDetailedMode
  },
  {
    name: 'dependencies',
    type: 'checkbox',
    message: 'Include optional packages?',
    when: isDetailedMode,
    choices () {
      const deps = Array.from(dependencies.keys());

      // Returns a filter function
      const byType = type =>
        key => dependencies.get(key).type === type;

      return [].concat(
        separator('JavaScript'),
        deps.filter(byType('js')),
        separator('PostCSS'),
        deps.filter(byType('postcss'))
      );
    }
  },
  {
    name: 'polyfills',
    type: 'confirm',
    message: `Include ${chalk.underline('polyfills.io')} <script>?`,
    when: isDetailedMode,
    default: false
  },
  {
    name: 'serviceWorker',
    type: 'confirm',
    message: `Include ${chalk.underline('service-worker.js')} <script>?`,
    when: isDetailedMode,
    default: false
  }
];

module.exports = class extends yeoman.Base {
  constructor (args, options) {
    super(args, options);
    this.props = {
      dependencies: [],
      nodeVersion: nodeVersions[0],
      polyfills: false,
      serviceWorker: false
    };
    this.log(INTRO);
  }

  prompting () {
    const done = this.async();
    this.prompt(prompts, props => {
      Object.assign(
        this.props,
        props,
        computedProps(props)
      );
      done();
    });
  }

  writing () {
    const templates = this.templatePath();
    const dest = this.destinationPath();
    this.fs.copyTpl(`${templates}/*`, dest, this.props);
    this.fs.copy(`${templates}/.github`, `${dest}/.github`);
  }

  install () {
    this.installDependencies();
  }
};
