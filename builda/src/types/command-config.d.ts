import ModuleType from './module-types';
import TSubstitution from './substitution';
export interface CommandConfig {
  name: string;
  type: ModuleType;
  use: string;
  outputPath: string;
  substitute: TSubstitution[];
}

export default CommandConfig;
