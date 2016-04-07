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

const separator = label =>
  new inquirer.Separator(`--- ${label} ---`);

const dependencyConflicts = new Map([
  ['ramda', 'lodash'],
  ['lodash', 'underscore'],
  ['underscore', 'ramda']
]);

const propExtras = {
  // TODO: Add logic to compute this from `props.repository`
  get repositoryRoot () {
    return 'path/to/clone';
  }
};

const prompts = [
  {
    name: 'title',
    type: 'input',
    message: 'Title',
    default: 'Drizzle Project',
    validate (input) {
      return input.length > 1;
    }
  },
  {
    name: 'slug',
    type: 'input',
    message: 'Slug',
    default (answers) {
      return utils.toSlug(answers.title);
    },
    validate (input) {
      // TODO: Might be too strict...just needs to be valid npm name
      return utils.isSlug(input);
    }
  },
  {
    name: 'description',
    type: 'input',
    message: 'Project description',
    default: 'A new Drizzle project.',
    validate (input) {
      return input.length > 1;
    }
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author',
    default: 'Cloud Four',
    validate (input) {
      return input.length > 1;
    }
  },
  {
    name: 'repository',
    type: 'input',
    message: 'Repository URL',
    default (answers) {
      const author = utils.toSlug(answers.author);
      const slug = answers.slug;
      return `git@github.com:${author}/${slug}.git`;
    }
  },
  {
    name: 'nodeVersion',
    type: 'list',
    message: 'Node.js version',
    choices: [
      '>=4.0.0',
      '>=5.0.0'
    ]
  },
  {
    name: 'dependencies',
    type: 'checkbox',
    message: 'Optional libraries',
    choices: [
      separator('JavaScript'),
      'gsap',
      'jquery',
      'lodash',
      'moment',
      'ramda',
      'underscore',
      separator('CSS'),
      'postcss-easings',
      'postcss-mixins',
      'css-modularscale'
    ]
  },
  {
    name: 'redundantDependencies',
    type: 'checkbox',
    message: 'Some of your chosen libraries are redundant. Remove some.',
    when (answers) {
      const deps = answers.dependencies;
      return deps.some(dep => {
        const conflict = dependencyConflicts.get(dep);
        return deps.indexOf(conflict) !== -1;
      });
    },
    choices (answers) {
      const deps = answers.dependencies;
      return deps.filter(dep => dependencyConflicts.has(dep));
    }
  },
  {
    name: 'polyfills',
    type: 'confirm',
    message: 'Polyfills',
    default: false
  },
  {
    name: 'serviceworker',
    type: 'confirm',
    message: 'Service Worker',
    default: false
  }
];

module.exports = class extends yeoman.Base {
  constructor (args, options) {
    super(args, options);
    this.props = {};
    this.log(INTRO);
  }

  prompting () {
    const done = this.async();
    this.prompt(prompts, props => {
      Object.assign(this.props, props, propExtras);
      done();
    });
  }

  writing () {
    const templates = this.templatePath();
    const dest = this.destinationPath();
    this.fs.copyTpl(`${templates}/*`, dest, this.props);
  }

  install () {
    this.installDependencies();
  }
};
