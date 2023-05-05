import { throwError } from 'helpers';

import type { BlueprintScriptContent } from 'types/blueprint-script-config';
import type TSubstitution from 'types/substitution';
import ModuleRegistry from 'types/module-registry';

type TGetSubstitutions = {
  name: string;
  registry: ModuleRegistry;
  script: BlueprintScriptContent;
  sub?: {
    replace: string;
    with: string;
  };
};

export const getSubstitutions = ({
  name,
  registry,
  script,
  sub
}: TGetSubstitutions): TSubstitution[] => {
  const substitutions = [] as TSubstitution[];

  const substitute =
    script?.substitute && script.substitute?.length > 0
      ? script?.substitute
      : registry?.generatorOptions?.substitutions;

  if (substitute && substitute.length) {
    substitute.forEach((sub: TSubstitution) => {
      const defaultString = sub.with === 'script' ? name : sub.with;
      const replaceString = (sub?.replace as string) || sub.replace;
      const subtring = sub?.with as string;
      const withString = subtring || defaultString || '';
      // No substitution was provided but the config requires one
      if (!defaultString && !replaceString && sub.required) {
        throwError(
          `"--${sub.replace}" missing in arguments. This is required.\n`
        );
      }

      // User has not provided a substitution but the config has a default fallback value
      if (withString && !replaceString) {
        substitutions.push({
          replace: replaceString.toUpperCase(),
          with: withString
        });
      }

      // User has provided the substitution argument
      if (replaceString) {
        // User has provided the substitution argument with no value
        if (withString === '') {
          throwError(`"--${sub.replace}" requires a value`);
        }

        if (
          sub.valid &&
          withString !== '' &&
          !sub.valid?.includes(withString)
        ) {
          throwError(
            `\n"${withString}" is not a valid ${
              sub.replace
            }. Please use one of the following: \n - ${sub.valid.join(
              `\n - `
            )}\n`
          );
        }

        // The value provided is valid
        substitutions.push({
          replace: sub.replace.toUpperCase(),
          with: withString
        });
      }
    });
  }
  return substitutions;
};

export default getSubstitutions;
