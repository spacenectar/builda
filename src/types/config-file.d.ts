import { BlueprintScriptContents } from './blueprint-script-config';
import { ModuleConfig } from './module-config';
import { GenIndexConfig } from './gen-index-config';

export interface ConfigFile {
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
  prefabs: ModuleConfig;
  blueprints: ModuleConfig;
  indexes: GenIndexConfig;
}
