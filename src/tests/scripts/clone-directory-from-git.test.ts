import fs from 'fs';
import cloneDirectoryFromGit from '@scripts/clone-directory-from-git';

describe('cloneDirectoryFromGit() function happy path', () => {
  test.skip('cloneDirectoryFromGit() function clones a directory from a git repository', () => {
    const url =
      'https://github.com/st-elmos-fire/builda/tree/master/scaffolds/component-with-storybook';
    const directory = './experiments/component-with-storybook';
    cloneDirectoryFromGit(url, directory);
    expect(fs.existsSync(directory)).toBe(true);
  });
});
