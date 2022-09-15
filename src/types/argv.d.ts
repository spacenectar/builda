import { argv } from "process";

export type Argv = {
  [x: string]: unknown;
  help: unknown;
  _: (string | number)[];
  $0: string;
} | {
  [x: string]: unknown;
  help: unknown;
  _: (string | number)[];
  $0: string;
}

export default argv;
