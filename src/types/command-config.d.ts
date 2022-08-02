import ModuleType from './module-types';

export interface CommandConfig {
  name: string;
  type: ModuleType;
  use: string;
  outputPath: string;
  substitute: {
    [key: string]: string[];
  };
}

export default CommandConfig;
