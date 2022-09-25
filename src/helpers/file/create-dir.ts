import fs from 'fs';

export const createDir = async (dirPath: string): Promise<boolean> => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    return true;
  } catch (err) {
    return false;
  }
};

export default createDir;
