import throwError from './throw-error';

import type { BlueprintScriptContent } from 'types/blueprint-script-config';
import type TSubstitution from 'types/substitution';
import type { Argv } from 'types/argv';
import ModuleRegistry from 'types/module-registry';

type TGetSubstitutions = {
  name: string;
  registry: ModuleRegistry;
  command: BlueprintScriptContent;
  args?: Argv;
};

export const getSubstitutions = ({
  name,
  registry,
  command,
  args
}: TGetSubstitutions): TSubstitution[] => {
  const substitutions = [] as TSubstitution[];

  const substitute =
    command?.substitute && command.substitute?.length > 0
      ? command?.substitute
      : registry?.substitute;

  if (substitute && substitute.length) {
    substitute.forEach((sub: TSubstitution) => {
      const defaultString = sub.with === 'command' ? name : sub.with;
      const replaceString = (args?.replace as string) || sub.replace;
      const argString = args?.with as string;
      const withString = argString || defaultString || '';
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
