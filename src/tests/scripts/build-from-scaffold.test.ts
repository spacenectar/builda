import fs from 'fs';

import debug from '@scripts/debug';
import buildFromScaffold from '@scripts/build-from-scaffold';

const MOCK_SCAFFOLD_PATH = './src/mocks/scaffolds/test-scaffold';
const MOCK_OUTPUT_DIRECTORY = './experiments/atom/test-component/';

describe('Build from scaffold function', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    debug({ runInit: true, force: true });
  });

  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    fs.rmSync('./experiments', { recursive: true });
  });

  test('An index.tsx file is generated with the correct data', async () => {
    await buildFromScaffold('atom', 'TestComponent', MOCK_SCAFFOLD_PATH);
    const filePath = `${MOCK_OUTPUT_DIRECTORY}/index.tsx`;
    expect(fs.existsSync(filePath)).toBe(true);
    const file = fs.readFileSync(filePath, 'utf8');
    expect(file).toContain(
      'export const TestComponent: React.FC<Props> = ({ text, ...props }: Props) => {'
    );
    expect(file).toContain(
      "<div className={styles['test-component']} {...props}>"
    );
    expect(file).toContain('export default TestComponent;');
  });

  test('An index.stories.tsx file is generated with the correct data', async () => {
    await buildFromScaffold('atom', 'TestComponent', MOCK_SCAFFOLD_PATH);
    const filePath = `${MOCK_OUTPUT_DIRECTORY}/index.stories.mdx`;
    expect(fs.existsSync(filePath)).toBe(true);
    const file = fs.readFileSync(filePath, 'utf8');
    expect(file).toContain('title="atom/TestComponent"');
    expect(file).toContain('component={TestComponent}');
    expect(file).toContain('# Testcomponent');
    expect(file).toContain('The Testcomponent component.');
    expect(file).toContain('{(args) => <TestComponent {...args} />}');
    expect(file).toContain('<ArgsTable of={TestComponent} />');
  });

  test('A styles.module.scss file is generated with the correct data', async () => {
    await buildFromScaffold('atom', 'TestComponent', MOCK_SCAFFOLD_PATH);
    const filePath = `${MOCK_OUTPUT_DIRECTORY}/styles.module.scss`;
    expect(fs.existsSync(filePath)).toBe(true);
    const file = fs.readFileSync(filePath, 'utf8');
    expect(file).toContain('.test-component {');
  });
});
