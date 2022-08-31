import TSubstitution from './substitution';

export type ScaffoldScriptContent = {
  use: string;
  output_dir: string;
  substitute: TSubstitution[] | [];
};

export interface ScaffoldScriptConfig {
  [key: string]: ScaffoldScriptContent;
}

export default ScaffoldScriptConfig;
