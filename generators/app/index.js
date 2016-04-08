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

const dependencyConflicts = new Map([
  ['ramda', 'lodash'],
  ['lodash', 'underscore'],
  ['underscore', 'ramda']
]);

const prompts = [
  {
    name: 'title',
    type: 'input',
    message: 'Title',
    default: 'Drizzle Project',
    validate (input) {
      return utils.isLongAs(2, input);
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
    choices () {
      const deps = Array.from(dependencies.keys());
      // Returns a filter function
      const byType = type =>
        key => dependencies.get(key).type === type;

      return [].concat(
        // Group the JS packages
        separator('JavaScript'),
        deps.filter(byType('js')),

        // Group the PostCSS packages
        separator('PostCSS'),
        deps.filter(byType('postcss'))
      );
    }
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
      Object.assign(this.props, props);
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
