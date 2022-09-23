export default [
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your application?',
    default: 'my-app',
    validate: (input: string) => {
      if (input.length) {
        return true;
      } else {
        return 'Please enter a name for your application';
      }
    }
  },
  {
    type: 'input',
    name: 'pathName',
    message: 'What is the path to the prefab?',
    default: 'github:builda-modules/prefab-test@latest',
    validate: (input: string) => {
      if (input.length) {
        return true;
      } else {
        return 'Please enter a path to the prefab';
      }
    }
  },
  {
    type: 'list',
    name: 'yarnOrNpm',
    message: 'Which package manager would you like to use?',
    default: 'npm',
    choices: ['npm', 'yarn']
  },
  {
    type: 'confirm',
    name: 'autoInstall',
    message: 'Would you like to automatically install all dependencies?',
    default: true
  }
];
