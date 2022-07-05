import fs from 'fs';
import path from 'path';

const writeFile = (dir: any, name: string, data: any) => {
  fs.writeFileSync(path.join(dir, name), data);
};

export default writeFile;
