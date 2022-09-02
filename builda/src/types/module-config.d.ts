export type ModuleConfigContents = {
  version: string;
  resolve?: string;
  location: string;
  output_dir?: string;
};

export type ModuleConfig = {
  [key: string]: ModuleConfigContents;
};

export default ModuleConfig;
