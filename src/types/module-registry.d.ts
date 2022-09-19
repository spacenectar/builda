import TSubstitution from './substitution';
import ModuleConfig from './module-config';
export interface ModuleRegistry {
  name: string;
  type: 'blueprint' | 'prefab';
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
  files?: string[];
  custom_files?: string[];
  dependencies?: {
    [key: string]: string[];
  };
  blueprints?: ModuleConfig;
  prefabs?: ModuleConfig;
  substitute?: TSubstitution[];
}

export default ModuleRegistry;
