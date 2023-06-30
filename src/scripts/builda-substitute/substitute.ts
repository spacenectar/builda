// import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { getConfig, getRegistry, loopAndRewriteFiles } from 'helpers';

import { TSubstitution } from 'types/substitution';

/**
 * Substitute values found in all files in the rootFiles and applicationOnlyFiles arrays
 * (This is a post-processing step and exists to give prefab developers more control over the final output)
 */
export default async (substitutions: TSubstitution[]) => {
  const config = await getConfig();
  if (!config.fromPrefab) {
    throw new Error(
      'BuildaSubstitute can only be run from within an application built from a prefab'
    );
  }

  const registry = await getRegistry(
    path.join(process.cwd(), '.builda', 'export')
  );

  const rootFiles =
    registry?.generatorOptions?.rootFiles?.map((file) =>
      path.resolve(process.cwd(), typeof file === 'string' ? file : file.path)
    ) || [];

  const applicationOnlyFiles =
    registry?.generatorOptions?.applicationOnlyFiles?.map((file) =>
      path.resolve(process.cwd(), typeof file === 'string' ? file : file.path)
    ) || [];

  const filesToRewrite = [...rootFiles, ...applicationOnlyFiles];

  loopAndRewriteFiles({
    paths: filesToRewrite,
    substitute: substitutions
  });
};
