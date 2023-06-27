import TSubstitution from './substitution';

export type BlueprintScriptContent = {
  use: string;
  outputDir: string;
  substitute?: TSubstitution[] | [];
  variants: {
    name: string;
    outputPath: string;
  }[];
};

export interface BlueprintScriptConfig<T> {
  [key: string]: BlueprintScriptContent | T;
}

export default BlueprintScriptConfig;
