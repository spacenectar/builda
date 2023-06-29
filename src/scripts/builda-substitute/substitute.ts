// import fs from 'node:fs';
// import path from 'node:path';
// import process from 'node:process';

// import { loopAndRewriteFiles } from 'helpers';

import { TSubstitution } from 'types/substitution';

interface ISubstitute extends TSubstitution {
  /**
   * Include the root files in the substitution
   */
  includeRootFiles?: boolean;
}

export type TSubstitute = {
  /**
   * The list of substitutions to perform
   */
  substitutions: ISubstitute[];
};

/**
 * Substitute values found in all files in the export directory
 * and the root files (if specified)
 */
export default async ({ substitutions }: TSubstitute) => {
  substitutions.forEach((substitution) => {
    console.log(
      `Substituting ${substitution.replace} for ${substitution.with}`
    );
  });
};
