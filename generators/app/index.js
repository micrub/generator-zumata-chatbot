'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the stunning ' + chalk.red('generator-zumata-chatbot') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'packageName',
        message: 'What would you like your chatbot application to be named?',
        default: () => {
          return process.cwd().replace(/(?:.*[/\\])([^/\\]+?)[/\\]*?$/gi, '$1');
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description'
      },
      {
        type: 'input',
        name: 'homepage',
        message: 'Homepage'
      },
      {
        type: 'input',
        name: 'repoUrl',
        message: 'Link to the repository'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const TPLS = ['_package.json', '_README.md', '_.gitignore', '_.npmrc'];
    const RAW_GLOB_PATTERNS = ['{.,!(_)}*'];

    RAW_GLOB_PATTERNS.map(rawGlobPattern =>
      this.fs.copy(`${this.templatePath()}/**/${rawGlobPattern}`, this.destinationPath())
    );

    TPLS.map(tpl =>
      this.fs.copyTpl(
        this.templatePath(tpl),
        this.destinationPath(tpl.replace(/(_)/gi, '')),
        this.props
      )
    );
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: () => {
        console.info(
          `✨  Your chatbot application ${chalk.green(this.props.packageName)} is ready! ✨`
        );
      }
    });
  }
};
