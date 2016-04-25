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

const PackageType = {
  POSTCSS: 'PostCSS',
  JS: 'JavaScript'
};

const INTRO = `
${chalk.bold.underline('Welcome to your new Drizzle project.')}
${chalk.dim('Setup phase starting...')}
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
  ['gsap', PackageType.JS],
  ['jquery', PackageType.JS],
  ['lodash', PackageType.JS],
  ['moment', PackageType.JS],
  ['ramda', PackageType.JS],
  ['postcss-easings', PackageType.POSTCSS],
  ['postcss-mixins', PackageType.POSTCSS],
  ['css-modularscale', PackageType.POSTCSS]
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
      const depGroups = utils.groupByVal(Array.from(dependencies));
      const choices = [];

      Object.keys(depGroups).forEach(key => {
        choices.push(separator(key));
        choices.push.apply(choices, depGroups[key].map(utils.pairKey));
      });

      return choices;
    }
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
    const deps = this.props.dependencies;
    if (deps.length) {
      this.npmInstall(deps, {saveDev: true});
    }
  }

  /**
   * Signal the end.
   */
  end () {
    this.log(OUTRO);
  }
};
