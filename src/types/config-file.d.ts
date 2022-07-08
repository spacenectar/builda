export interface ConfigFile {
  app: {
    name: string;
    outputDirectory: string;
    scaffoldUrl: string;
  };
  commands: {
    [key: string]: {
      outputDirectory: string;
      scaffoldUrl: string;
    };
  };
}
