import TSubstitution from './substitution';

export type BlueprintScriptContent = {
  use: string;
  outputDir: string;
  substitute: TSubstitution[] | [];
};

export interface BlueprintScriptConfig<T> {
  [key: string]: BlueprintScriptContent | T;
}

export default BlueprintScriptConfig;
