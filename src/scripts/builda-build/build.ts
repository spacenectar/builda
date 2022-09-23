import type { ConfigFile } from 'types/config-file';

type TBuild = {
  prod: boolean;
  config: ConfigFile;
};

export default async ({ prod, config }: TBuild) => {
  // TODO
};
