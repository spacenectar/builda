import fs from 'fs';

import init from '@scripts/init';

import presetAnswers from '@mocks/preset-answers';

const fileName = '.buildaTest.yml';

const options = {
  fileName,
  presetAnswers
};

describe('init function (happy path)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(fileName);
  });

  test('A config file is produced', () => {
    init(options);
    expect(fs.existsSync(fileName)).toBe(true);
  });

  test('The config file contains an "app:" entry', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('app:');
  });

  test('The config file contains an appName value which reads "test"', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('name: test');
  });

  test('The config file contains an outputDirectory value which reads "./test"', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('outputDirectory: ./test');
  });

  test('The config file contains a scaffoldUrl value which reads ""', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('scaffoldUrl: http://test.url');
  });

  test('The config file contains a "scaffold:" entry', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('scaffolds:');
  });

  test('The config file contains an "atom" section with the correct values', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toMatch(
      /atom:\n    outputDirectory: ''\n.   scaffoldUrl: ''/gm
    );
  });

  test('The config file contains an "component" section with the correct values', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toMatch(
      /component:\n    outputDirectory: ''\n.   scaffoldUrl: ''/gm
    );
  });

  test('The config file contains a "test" section with the correct values', () => {
    init(options);
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toMatch(
      /test:\n    outputDirectory: ''\n.   scaffoldUrl: ''/gm
    );
  });
});

describe('init function (error path)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('If a config file already exists, an error is thrown and the promise is rejected', () => {
    fs.writeFileSync(fileName, 'test');
    expect(() => init(options)).rejects.toThrowError(
      `You already have a ${fileName} file. Process Aborted.`
    );
    fs.rmSync(fileName);
  });

  test('If a .buildcomrc file already exists, an error is thrown and the promise is rejected', () => {
    fs.writeFileSync('.buildcomrc', 'test');
    expect(() => init(options)).rejects.toThrowError(
      'Please delete the .buildcomrc file and try again. Process Aborted.'
    );
    fs.rmSync('.buildcomrc');
  });
});
