import { ModuleType } from './module-types';
import { CommandConfig } from './command-config';

type RemoveNameField<T> = Omit<T, 'name'>;

export interface ConfigFile {
  app: {
    name: string;
  };
  modules: {
    [ModuleType.SCAFFOLD]?: {
      [key: string]: string;
    };
    [ModuleType.PREFAB]?: {
      [key: string]: string;
    };
  };
  commands: {
    [key: string]: RemoveNameField<CommandConfig>;
  };
}
