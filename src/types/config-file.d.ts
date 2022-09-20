import { BlueprintScriptContents } from './blueprint-script-config';
import { ModuleConfig } from './module-config';
import { GenIndexConfig } from './gen-index-config';

export interface ConfigFile {
  default?: Omit<ConfigFile, 'default'>;
  name: string;
  app_root: string;
  package_manager: 'npm' | 'yarn';
  resolve?: {
    [key: string]: string;
  };
  watched: string[];
  blueprint_scripts: {
    [key: string]: BlueprintScriptContents;
  };
  prefab: string;
  blueprints: ModuleConfig;
  indexes: GenIndexConfig;
}
