import { getRegistry, loopAndRewriteFiles } from 'helpers';

import { TSubstitution } from 'types/substitution';

/**
 * Substitute values found in all files in the rootFiles and applicationOnlyFiles arrays
 * (This is a post-processing step and exists to give prefab developers more control over the final output)
 */
export default async (substitutions: TSubstitution[]) => {
  const registry = await getRegistry();

  const rootFiles =
    registry?.generatorOptions?.rootFiles?.map((file) =>
      typeof file === 'string' ? file : file.path
    ) || [];

  const applicationOnlyFiles =
    registry?.generatorOptions?.applicationOnlyFiles?.map((file) =>
      typeof file === 'string' ? file : file.path
    ) || [];

  const filesToRewrite = [...rootFiles, ...applicationOnlyFiles];

  loopAndRewriteFiles({
    paths: filesToRewrite,
    substitute: substitutions,
    fromRoot: true,
    toRoot: true
  });
};
