import ModuleType from './module-types';
import TSubstitution from './substitution';
export interface ModuleRegistry {
  name: string;
  type: ModuleType;
  version: string;
  author: string;
  description: string;
  keywords?: string[];
  funding?: string[];
  files: string[];
  dependencies?: {
    [key: string]: string[];
  };
  substitute? : TSubstitution[]
}

export default ModuleRegistry;
