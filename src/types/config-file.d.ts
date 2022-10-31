import { BlueprintScriptContents } from './blueprint-script-config';
import { ModuleConfig } from './module-config';
import { GenIndexConfig } from './gen-index-config';

export interface ConfigFile {
  /**
   * Ignore this property. It is used internally by builda
   */
  default?: Omit<ConfigFile, 'default'>;
  /**
   * The name of your app
   */
  name: string;
  /**
   * The working root directory of your app, generally the directory where your package.json file is located
   */
  rootDir: string;
  /**
   * The package manager to use for installing dependencies (Builda currently supports npm and yarn)
   */
  packageManager: string;
  /**
   * The resolvers to use for resolving modules (See (https://builda.app/docs/resolvers) for more info)
   */
  resolvers?: {
    [key: string]: string;
  };
  /**
   * Any files to include in the root of the export directory (can be a glob pattern)
   */
  watchInclude?: string[];
  /**
   * Any files to ignore in the root of the export directory (can be a glob pattern)
   */
  watchIgnore?: string[];
  /**
   * Any files from the prefab which you do not want to be a part of your app
   * (can be a glob pattern)
   */
  deletedInPrefab?: string[];
  /**
   * Any blueprint scripts you want to be available to your app (See (https://builda.app/docs/build-a-module/blueprint-scripts) for more info)
   */
  blueprintScripts?: {
    [key: string]: BlueprintScriptContents;
  };
  /**
   * The path to the prefab used by your app (can be a local path, a remote url or a resolver)
   */
  prefab?: string;
  /**
   * The blueprints to use in your app (See (https://builda.app/docs/blueprints) for more info)
   */
  blueprints?: ModuleConfig;
  /**
   * Any folders that you wish to generate an index file for (See (https://builda.app/docs/build-a-module/gen-index) for more info)
   * (can be a glob pattern)
   */
  indexes?: GenIndexConfig;
}
