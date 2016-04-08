'use strict';

/**
 * Drizzle Project Yeoman Generator
 *
 * @example yo drizzle
 * @example yo drizzle --full
 * @example yo drizzle --help
 */

const chalk = require('chalk');
const inquirer = require('inquirer');
const yeoman = require('yeoman-generator');
const utils = require('./utils');

const INTRO = `
${chalk.bold.underline('Welcome to your new Drizzle project.')}
${chalk.dim('Beginning setup phase...')}
`;

// For use in a prompt
const nodeVersions = [
  '>=4.0.0',
  '>=5.0.0'
];

// Optional things to install
const dependencies = new Map([
  ['gsap', {type: 'js'}],
  ['jquery', {type: 'js'}],
  ['lodash', {type: 'js'}],
  ['moment', {type: 'js'}],
  ['ramda', {type: 'js'}],
  ['postcss-easings', {type: 'postcss'}],
  ['postcss-mixins', {type: 'postcss'}],
  ['css-modularscale', {type: 'postcss'}]
]);

// This is merged into props after the prompt phase.
const computedProps = props => {
  return {
    repository: utils.toGitHubUrl(props.author, props.slug)
  };
};

// Separator for list/checkbox prompts.
const separator = label =>
  new inquirer.Separator(`--- ${label} ---`);

// Always presented
const standardPrompts = [
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
    message: 'Author for package.json',
    default: 'cloudfour',
    validate (input) {
      return utils.isLongAs(2, input);
    }
  }
];

// Presented when the --full option is used
const extraPrompts = [
  {
    name: 'nodeVersion',
    type: 'list',
    message: 'Node version for package.json',
    choices: nodeVersions
  },
  {
    name: 'dependencies',
    type: 'checkbox',
    message: 'Include optional packages?',
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
    default: false
  },
  {
    name: 'serviceWorker',
    type: 'confirm',
    message: `Include ${chalk.underline('service-worker.js')} <script>?`,
    default: false
  }
];

module.exports = class extends yeoman.Base {
  /**
   * Define options and arguments.
   * Set the default properties (for optional prompts).
   */
  constructor (args, options) {
    super(args, options);

    this.option('full', {
      desc: 'Present the full list of prompts.',
      type: Boolean,
      default: false
    });

    this.props = {
      dependencies: [],
      nodeVersion: nodeVersions[0],
      slug: this.appname
    };
  }

  /**
   * Show the intro message.
   * Present the prompts.
   * Assign thier answers as properties.
   */
  prompting () {
    const done = this.async();
    const prompts = this.options.full ?
      standardPrompts.concat(extraPrompts) : standardPrompts;

    this.log(INTRO);

    this.prompt(prompts, props => {
      // Assign input props (must be done first)
      Object.assign(this.props, props);
      // Assign computed props
      Object.assign(this.props, computedProps(this.props));
      done();
    });
  }

  /**
   * Render the EJS templates with `this.props`.
   * Copy the static files into place.
   */
  writing () {
    const templates = this.templatePath();
    const dest = this.destinationPath();
    this.fs.copyTpl(`${templates}/*`, dest, this.props);
    this.fs.copy(`${templates}/.github`, `${dest}/.github`);
  }

  /**
   * Install Node dependencies.
   */
  install () {
    this.installDependencies();
  }
};
