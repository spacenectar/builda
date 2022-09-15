import TSubstitution from './substitution';
import ModuleConfig from './module-config';
export interface ModuleRegistry {
  name: string;
  type: 'scaffold' | 'prefab';
  version: string;
  url: string;
  author: {
    name: string;
    email?: string;
    website?: string;
    builda_user?: string;
  };
  keywords?: string[];
  funding?: string[];
  files: string[];
  required_in_root?: string[];
  dependencies?: {
    [key: string]: string[];
  };
  prefabs?: ModuleConfig;
  substitute?: TSubstitution[];
}

export default ModuleRegistry;
