import returnMessage from '@helpers/return-message';
import path from 'path';
import fs from 'fs';

const makeDir = (dir: string, name: string) => {
  try {
    fs.mkdirSync(dir);
  } catch (err) {
    returnMessage(
      `'${name.split('/')[0]}' is not writable or does not exist`,
      'error'
    );
  }
};

/** Props */
interface Props {
  /**
   * The name of the directory to create
   */
  name: string;
  /**
   * The name of the directories to create
   * @default []
   */
  dirs?: string[];
  /**
   * Force creation even if it already exists.
   * @default false
   */
  force?: boolean;
}

const generateDirectory = async ({ name, dirs, force }: Props) => {
  const rootDir = name.trim();

  if (dirs) {
    dirs.forEach((dir: any) => {
      const dirPath = path.join(rootDir, dir);
      makeDir(dirPath, rootDir);
    });
  } else {
    if (fs.existsSync(rootDir)) {
      if (force) {
        returnMessage(
          `Existing ${name} folder overwritten with --force. I hope you know what you're doing!.`,
          'warning'
        );
        rootDir && fs.rmSync(rootDir, { recursive: true, force: true });
        return makeDir(rootDir, name);
      }
      returnMessage(
        `${name} already exists, aborting entire process, please run the command again`,
        'error'
      );
    }
    return makeDir(name, name);
  }
};

export default generateDirectory;
