import throwError from "./throw-error";

import type CommandConfig from "@typedefs/command-config";
import type TSubstitution from "@typedefs/substitution";
import type { TSubstitute } from '@typedefs/command-config';
import type { Argv } from "@typedefs/argv";


export const getSubstitutions = (commandList: Partial<CommandConfig>, argv: Argv) => {
  const substitutions = [] as TSubstitution[];
  if (commandList.substitute) {
    commandList.substitute.forEach((sub: TSubstitute) => {
      // No substitution was provided but the config requires one
      if (sub.required && !argv[sub.string]) {
        throwError(
          `"--${sub.string}" missing in arguments. This is required.\n`
        );
      }

      // User has not provided a substitution but the config has a default fallback value
      if (sub.default && !argv[sub.string]) {
        substitutions.push({
          replace: sub.string,
          with: sub.default
        });
      }

      // User has provided the substitution argument
      if (argv[sub.string]) {
        const value =
          argv[sub.string] === true
            ? ''
            : (argv[sub.string] as string);

        // User has provided the substitution argument with no value
        if (value === '') {
          throwError(`"--${sub.string}" requires a value`);
        }

        if (
          sub.valid &&
          value !== '' &&
          !sub.valid?.includes(value)
        ) {
          throwError(
            `\n"${value}" is not a valid ${
              sub.string
            }. Please use one of the following: \n - ${sub.valid.join(
              `\n - `
            )}\n`
          );
        }

        // The value provided is valid
        substitutions.push({
          replace: sub.string,
          with: argv[sub.string] as string
        });
      }
    });
  }
  return substitutions;
};

export default getSubstitutions;
