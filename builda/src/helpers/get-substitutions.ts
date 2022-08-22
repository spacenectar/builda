import throwError from "./throw-error";

import type CommandConfig from "@typedefs/command-config";
import type TSubstitution from "@typedefs/substitution";
import type { Argv } from "@typedefs/argv";


export const getSubstitutions = (commandList: Partial<CommandConfig>, argv?: Argv) => {
  const substitutions = [] as TSubstitution[];
  if (commandList.substitute?.length) {
    commandList.substitute.forEach((sub: TSubstitution) => {
      const argString = argv?.[sub.replace] || '';
      // No substitution was provided but the config requires one
      if (sub.required && !argString) {
        throwError(
          `"--${sub.replace}" missing in arguments. This is required.\n`
        );
      }

      // User has not provided a substitution but the config has a default fallback value
      if (sub.with && !argString) {
        substitutions.push({
          replace: sub.replace.toUpperCase(),
          with: sub.with
        });
      }

      // User has provided the substitution argument
      if (argString) {
        const value =
          argString === true
            ? ''
            : (argString as string);

        // User has provided the substitution argument with no value
        if (value === '') {
          throwError(`"--${sub.replace}" requires a value`);
        }

        if (
          sub.valid &&
          value !== '' &&
          !sub.valid?.includes(value)
        ) {
          throwError(
            `\n"${value}" is not a valid ${
              sub.replace
            }. Please use one of the following: \n - ${sub.valid.join(
              `\n - `
            )}\n`
          );
        }

        // The value provided is valid
        substitutions.push({
          replace: sub.replace.toUpperCase(),
          with: argString as string
        });
      }
    });
  }
  return substitutions;
};

export default getSubstitutions;
