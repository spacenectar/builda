import TSubstitution from './substitution';
import ModuleConfig from './module-config';

type RootFile = {
  /**
   * The path to the root file (relative to the .builda/export directory)
   */
  path: string;
  /**
   * Should the file contents be rewritten with substitutions?
   * @default false
   * @optional
   */
  rewrite?: boolean;
  /**
   * Are there any custom substitutions to be made? see (https://builda.app/docs/build-a-module/substitutions)
   * @optional
   */
  substitutions: TSubstitution[];
};

/**
 * See (https://builda.app/docs/build-a-module/registry) for more info
 */
export interface ModuleRegistry {
  /**
   * The name of the module
   */
  name: string;
  /**
   * The module type
   */
  type: 'blueprint' | 'prefab';
  /**
   * The module version number (in semver format)
   * @pattern ^\d+\.\d+\.\d+$
   * @example 1.0.0
   */
  version: string;
  /**
   * The url of the module (generally a git repository)
   * You can also use resolver aliases here. See (https://builda.app/docs/resolvers)
   * @example https://github.com/cool-developer/blueprint-cool-module
   */
  url: string;
  /**
   * The module author's details
   * @optional
   */
  author?: {
    /**
     * The author's name
     */
    name: string;
    /**
     * The author's email
     * @optional
     */
    email?: string;
    /**
     * The author's website
     * @optional
     */
    website?: string;
    /**
     * The builda username of the author. This is optional but is required if you want to publish your module to the builda trade store
     * (see (https://builda.app/docs/trade-store))
     * @optional
     */
    builda_user?: string;
  };
  /**
   * Do you want to publish this module to the builda trade store? (see (https://builda.app/docs/trade-store))
   * @optional
   * @default false
   */
  publishToTradeStore?: boolean;
  /**
   * The module keywords (optional but recommended if you want to publish your module to the builda trade store)
   * @optional
   */
  keywords?: string[];
  /**
   * Is this module looking for funding? If so, you can add a list of funding links here.
   * @optional
   */
  funding?: string[];
  /**
   * Any files which should be copied to the app root when the module is installed in addition
   * to the default files (see (https://builda.app/docs/build-a-module/prefabs#root-files))
   * If the module is a blueprint, this will be ignored
   * @optional
   */
  filesInRoot?: RootFile[];
  /**
   * If this module has any required dependencies, you can add them here
   * @example "react": "^17.0.1"
   * @optional
   */
  dependencies?: {
    [key: string]: string;
  };
  /**
   * If the module is a prefab and has any required blueprints which are not built into the prefab, you can add them here
   * if the module is a blueprint, this field is ignored
   * @example "github:cool-developer/blueprint-cool-module@3.0.0"
   * @optional
   */
  blueprints?: ModuleConfig;
  /**
   * A list of substitutions to make when the module is installed (see (https://builda.app/docs/build-a-module/substitutions))
   * @optional
   */
  substitute?: TSubstitution[];
}

export default ModuleRegistry;
