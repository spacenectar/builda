import child_process from 'child_process';

//TODO: This isn't working yet
export const cloneDirectoryFromGit = (url: string, directory: string) => {
  child_process.execSync(`git clone ${url} ${directory}`);
};

export default cloneDirectoryFromGit;
