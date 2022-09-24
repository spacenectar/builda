import ModuleRegistry from 'types/module-registry';

export type TAnswers = {
  projectName: string;
  prefab?: string;
  prefabRegistry?: ModuleRegistry;
  appRoot: string;
  packageManager: string;
};
