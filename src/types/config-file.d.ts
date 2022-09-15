import { ScaffoldScriptContents } from './scaffold-script-config';
import { RunScriptConfig } from './run-script-config';
import { ModuleConfig } from './module-config';

export interface ConfigFile {
  name: string;
  app_root: string;
  resolve?: {
    [key: string]: string;
  };
  watched: string[];
  scaffold_scripts: {
    [key: string]: ScaffoldScriptContents;
  };
  run_scripts: RunScriptConfig;
  prefabs: ModuleConfig;
  scaffolds: ModuleConfig;
}
