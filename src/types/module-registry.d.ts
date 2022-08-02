export interface ModuleRegistry {
  name: string;
  type: 'scaffold' | 'prefab';
  version: string;
  author: string;
  description: string;
  keywords?: string[];
  funding?: string[];
  files: string[];
  dependencies?: {
    [key: string]: string[];
  };
}

export default ModuleRegistry;
