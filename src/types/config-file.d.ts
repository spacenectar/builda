export interface ConfigFile {
  app: {
    name: string;
    scaffolds?: {
      [key: string]: string;
    };
    prefabs?: {
      [key: string]: string;
    };
  };
  commands: {
    [key: string]: {
      type: string;
      outputPath: string;
      use: string;
      allowedPrefixes: string[];
    };
  };
}
