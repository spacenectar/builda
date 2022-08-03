import ModuleType from './module-types';

export type TSubstitute = {
  string: string;
  default?: string;
  valid?: string[];
  required?: boolean;
};

export interface CommandConfig {
  name: string;
  type: ModuleType;
  use: string;
  outputPath: string;
  substitute: TSubstitute[];
}

export default CommandConfig;
