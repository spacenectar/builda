export interface ComponentRegistry {
  name: string;
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

export default ComponentRegistry;
