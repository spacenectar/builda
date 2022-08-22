import throwError from "./throw-error";

import type CommandConfig from "@typedefs/command-config";
import type TSubstitution from "@typedefs/substitution";
import type { Argv } from "@typedefs/argv";
import ModuleRegistry from "@typedefs/module-registry";


type TGetSubstitutions = {
  registry?: ModuleRegistry;
  command?: CommandConfig;
  args?: Argv;
}

export const getSubstitutions = ({
  registry,
  command,
  args
}: TGetSubstitutions): TSubstitution[] => {
  const substitutions = [] as TSubstitution[];

  const substitute = (command?.substitute && command.substitute.length > 0) ? command?.substitute : registry?.substitute;


  if (substitute && substitute.length) {
    substitute.forEach((sub: TSubstitution) => {
      const defaultString = sub.with === 'command' ? command?.name : sub.with;
      const replaceString = args?.replace as string || sub.replace;
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
