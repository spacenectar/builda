export { buildaProject, command as projectCommand } from './builda-project';
export { buildaExecute, command as executeCommand } from './builda-execute';
export { buildaInstall, command as installCommand } from './builda-install';
export { buildaPublish, command as publishCommand } from './builda-publish';
export { buildaUpdate, command as updateCommand } from './builda-update';
export { buildaWatch, command as watchCommand } from './builda-watch';
export { buildaIndexer, command as indexerCommand } from './builda-indexer';
export { buildaNew, command as newCommand } from './builda-new';

// Legacy code

import buildFromPrefabs from './build-from-prefabs';
import generateCommands from './generate-commands';
import init from './init';

export { buildFromPrefabs, generateCommands, init };
