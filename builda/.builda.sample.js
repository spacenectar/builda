const appRoot = './experiments';

module.exports = {
  name: 'my-app',
  app_root: appRoot,
  scaffold_scripts: {
    component: {
      use: 'default-ts',
      output_dir: `${appRoot}/components`
    },
    atom: {
      use: 'default-ts',
      output_dir: `${appRoot}/atoms`
    },
    molecule: {
      use: 'default-ts',
      output_dir: `${appRoot}/molecules`
    },
    organism: {
      use: 'default-ts',
      output_dir: `${appRoot}/organisms`
    }
  },
  prefabs: {
    test: {
      version: '0.0.1',
      location: 'github:builda/test',
      output_dir: `${appRoot}`
    }
  },
  scaffolds: {
    component: {
      version: '3.0.0'
    },
    page: {
      version: '1.0.0'
    }
  }
};
