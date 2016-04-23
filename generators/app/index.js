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

const OUTRO = `
${chalk.dim('Setup phase completed.')}
`;

// Command options (e.g. you drizzle --full)
const standardOptions = new Map([
  ['full', {
    desc: 'Present the full list of prompts.',
    type: Boolean,
    default: false
  }]
]);

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

// Separator for list/checkbox prompts.
const separator = label =>
  new inquirer.Separator(`--- ${label} ---`);

// Always presented
const standardPrompts = [
  {
    name: 'title',
    type: 'input',
    message: 'Title',
    default: 'Untitled Drizzle Project'
  },
  {
    name: 'description',
    type: 'input',
    message: 'Description',
    default: 'A description of my project.'
  }
];

// Presented when the --full option is used
const extraPrompts = [
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
    name: 'serviceWorker',
    type: 'confirm',
    message: `Include a ${chalk.underline('service-worker.js')} script?`,
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

    // Setup options
    standardOptions.forEach((val, key) =>
      this.option(key, val)
    );

    // Setup default props
    this.props = {
      dependencies: [],
      slug: utils.toSlug(this.appname)
    };

    this.log(INTRO);
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

    this.prompt(prompts, props => {
      // Assign input props (must be done first)
      Object.assign(this.props, props);

      done();
    });
  }

  /**
   * Copy Drizzle folder contents to destination.
   * Copy .github files to destination (TODO: move these to Drizzle)
   * Render README.md template to destination.
   */
  writing () {
    const dest = this.destinationPath();
    const templates = this.templatePath();

    this.fs.copy(`${templates}/drizzle/**/*`, dest, {
      globOptions: {
        dot: true,
        ignore: [
          '**/.git',
          '**/.travis.yml',
          '**/LICENSE',
          '**/README.md'
        ]
      }
    });

    this.fs.copy(
      `${templates}/.github`, `${dest}/.github`
    );

    this.fs.copyTpl(
      `${templates}/README.md`,
      `${dest}/README.md`,
      this.props
    );
  }

  /**
   * Extend the Drizzle package.json with prompt values.
   * Install dependencies selected via prompt.
   */
  install () {
    if (this.options.full && this.props.dependencies.length) {
      this.npmInstall(this.props.dependencies, {
        saveDev: true
      });
    }
  }

  /**
   * Signal the end.
   */
  end () {
    this.log(OUTRO);
  }
};
