'use strict';

/**
 * Drizzle Project Yeoman Generator
 *
 * @example yo drizzle
 */

const chalk = require('chalk');
const inquirer = require('inquirer');
const yeoman = require('yeoman-generator');

const separator = label =>
  new inquirer.Separator(`--- ${label} ---`);

const dependencyConflicts = new Map([
  ['ramda', 'lodash'],
  ['lodash', 'underscore'],
  ['underscore', 'ramda']
]);

const prompts = [
  {
    name: 'title',
    type: 'input',
    message: 'Project title',
    default: 'Drizzle Project',
    validate (input) {
      return input.length > 1;
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
    name: 'dependencies',
    type: 'checkbox',
    message: 'Optional libraries',
    choices: [
      separator('JavaScript'),
      {
        name: 'GSAP',
        value: 'gsap'
      },
      {
        name: 'jQuery',
        value: 'jquery'
      },
      {
        name: 'LoDash',
        value: 'lodash'
      },
      {
        name: 'Moment',
        value: 'moment'
      },
      {
        name: 'Ramda',
        value: 'ramda'
      },
      {
        name: 'Underscore',
        value: 'underscore'
      },
      separator('CSS'),
      {
        name: 'PostCSS Easings',
        value: 'postcss-easings'
      },
      {
        name: 'PostCSS Mixins',
        value: 'postcss-mixins'
      },
      {
        name: 'PostCSS Modular Scale',
        value: 'css-modularscale'
      }
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
    this.log(chalk.bold.underline('Welcome to your new Drizzle project.'));
    this.log(chalk.dim('Beginning setup phase...'));
  }

  prompting () {
    const done = this.async();
    this.prompt(prompts, props => {
      this.props = props;
      console.log(this.props);
      done();
    });
  }

  writing () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install () {
    this.installDependencies();
  }
};
