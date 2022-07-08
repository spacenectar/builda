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
    init(options);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (fs.existsSync(fileName)) {
      fs.rmSync(fileName);
    }
  });

  test('A config file is produced', () => {
    expect(fs.existsSync(fileName)).toBe(true);
  });

  test('The config file contains an "app:" entry', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('app:');
  });

  test('The config file contains an appName value which reads "test"', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('name: test');
  });

  test('The config file contains an outputDirectory value which reads "./test"', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('outputDirectory: ./test');
  });

  test('The config file contains a scaffoldUrl value which reads ""', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('scaffoldUrl: http://test.url');
  });

  test('The config file contains a "commands:" entry', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toContain('commands:');
  });

  test('The config file contains an "atom" section with the correct values', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toMatch(
      /  atom:\n.   type: scaffold\n.   outputDirectory: ''\n.   scaffoldUrl: ''/gm
    );
  });

  test('The config file contains an "component" section with the correct values', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toMatch(
      /  component:\n.   type: scaffold\n.   outputDirectory: ''\n.   scaffoldUrl: ''/gm
    );
  });

  test('The config file contains a "test" section with the correct values', () => {
    const config = fs.readFileSync(fileName, 'utf8');
    expect(config).toMatch(
      /  test:\n.   type: scaffold\n.   outputDirectory: ''\n.   scaffoldUrl: ''/gm
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
    if (fs.existsSync(fileName)) {
      fs.rmSync(fileName);
    }
  });

  test('If a config file already exists, an error is thrown and the promise is rejected', () => {
    fs.writeFileSync(fileName, 'test');
    expect(() => init(options)).rejects.toThrowError(
      `You already have a ${fileName} file. Process Aborted.`
    );
  });
});
