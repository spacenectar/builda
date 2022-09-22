export { project, command as generateProjectCommand } from './project';
export { execute, command as executeCommand } from './execute';
export { install, command as installCommand } from './install';
export { publish, command as publishCommand } from './publish';
export { update, command as updateCommand } from './update';
export { watch, command as watchCommand } from './watch';

// Legacy code

import buildFromBlueprint from './build-from-blueprint';
import buildFromPrefabs from './build-from-prefabs';
import generateCommands from './generate-commands';
import generateIndexes from './generate-indexes';
import init from './init';

export {
  buildFromBlueprint,
  buildFromPrefabs,
  generateCommands,
  generateIndexes,
  init
};