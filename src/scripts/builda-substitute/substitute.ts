import { getRegistry, loopAndRewriteFiles } from 'helpers';

/**
 * Substitute values found in all files in the rootFiles array which have 'rewrite' set to true
 * (This is a post-processing step and exists to give prefab developers more control over the final output)
 */
export default async (substitutions: TSubstitution[]) => {
  const registry = await getRegistry();

  const filesToRewrite = registry?.generatorOptions?.rootFiles?.filter(
    // Only return files which have 'rewrite' set to true (and are not a string)
    (file: string | RootFile) => typeof file !== 'string' && file.rewrite
  ) as RootFile[] | undefined;

  const paths = filesToRewrite?.map((file) => file.path) ?? [];

  const fileSubstitutions = filesToRewrite?.map(
    (file) => file.substitutions ?? []
  );

  const substitute = [...substitutions, ...(fileSubstitutions?.flat() ?? [])];

  loopAndRewriteFiles({
    paths,
    substitute,
    fromRoot: true,
    toRoot: true
  });
};
