'use strict';

/**
 * Drizzle Project Yeoman Generator
 *
 * @example yo drizzle
 */

const inquirer = require('inquirer');
const yeoman = require('yeoman-generator');
const utils = require('./utils');
const messages = require('./messages');

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
    message: messages.PROMPT_MODE_CHOICE,
    choices: modes
  },
  {
    name: 'title',
    type: 'input',
    message: messages.PROMPT_TITLE_INPUT,
    default: 'Untitled Drizzle Project',
    validate (input) {
      return utils.isLongAs(2, input);
    }
  },
  {
    name: 'description',
    type: 'input',
    message: messages.PROMPT_DESCRIPTION_INPUT,
    default: 'A description of my project.',
    validate (input) {
      return utils.isLongAs(2, input);
    }
  },
  {
    name: 'author',
    type: 'input',
    message: messages.PROMPT_AUTHOR_INPUT,
    default: 'Cloud Four',
    validate (input) {
      return utils.isLongAs(2, input);
    }
  },
  {
    name: 'repository',
    type: 'input',
    message: messages.PROMPT_REPO_INPUT,
    default (answers) {
      return utils.toGitHubUrl(answers.author, answers.title);
    }
  },
  {
    name: 'nodeVersion',
    type: 'list',
    message: messages.PROMPT_NODEV_INPUT,
    choices: nodeVersions,
    when: isDetailedMode
  },
  {
    name: 'dependencies',
    type: 'checkbox',
    message: messages.PROMPT_INSTALL_CHOICE,
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
    message: messages.PROMPT_POLYFILL_CONFIRM,
    when: isDetailedMode,
    default: false
  },
  {
    name: 'serviceWorker',
    type: 'confirm',
    message: messages.PROMPT_SERVICEWORKER_CONFIRM,
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
    this.log(messages.INTRO);
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
