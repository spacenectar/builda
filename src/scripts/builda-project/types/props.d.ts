import { TAnswers } from './answers';

export type TGenerateProject = {
  presetAnswers?: TAnswers;
  appName?: string;
  pathName?: string;
  packageManager?: string;
  autoInstall?: boolean;
};
