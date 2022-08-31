export type ModuleConfig = {
  [key: string]: {
    version: string;
    resolve?: string;
    location: string;
    root?: string;
  };
};

export default ModuleConfig;
