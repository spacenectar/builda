import { BlueprintScriptContents } from './blueprint-script-config';
import { ModuleConfig } from './module-config';
import { GenIndexConfig } from './gen-index-config';

export interface ConfigFile {
  default?: Omit<ConfigFile, 'default'>;
  name: string;
  rootDir: string;
  packageManager: string;
  resolvers?: {
    [key: string]: string;
  };
  watched?: string[];
  blueprintScripts?: {
    [key: string]: BlueprintScriptContents;
  };
  prefab?: string;
  blueprints?: ModuleConfig;
  indexes?: GenIndexConfig;
}
