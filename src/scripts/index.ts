export { project, command as generateProjectCommand } from './project';
export { execute, command as executeCommand } from './execute';

// Legacy code
import addModule from './add-module';
import buildFromBlueprint from './build-from-blueprint';
import buildFromPrefabs from './build-from-prefabs';
import generateCommands from './generate-commands';
import generateIndexes from './generate-indexes';
import init from './init';
import publishModule from './publish-module';
import updateModule from './update-module';
import watch from './watch';

export {
  addModule,
  buildFromBlueprint,
  buildFromPrefabs,
  generateCommands,
  generateIndexes,
  init,
  publishModule,
  updateModule,
  watch
};
