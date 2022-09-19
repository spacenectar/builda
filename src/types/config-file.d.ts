import { BlueprintScriptContents } from './blueprint-script-config';
import { RunScriptConfig } from './run-script-config';
import { ModuleConfig } from './module-config';
import { GenIndexConfig } from './gen-index-config';

export interface ConfigFile {
  name: string;
  app_root: string;
  resolve?: {
    [key: string]: string;
  };
  watched: string[];
  blueprint_scripts: {
    [key: string]: BlueprintScriptContents;
  };
  run_scripts: RunScriptConfig;
  prefabs: ModuleConfig;
  blueprints: ModuleConfig;
  indexes: GenIndexConfig;
}
