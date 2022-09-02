import TSubstitution from './substitution';

export type ScaffoldScriptContent = {
  use: string;
  output_dir: string;
  substitute: TSubstitution[] | [];
};

export interface ScaffoldScriptConfig<T> {
  [key: string]: ScaffoldScriptContent | T;
}

export default ScaffoldScriptConfig;
