// Gets the name and version of the module from the path

export const getDetailsFromPath = (modulePath: string) => {
  const moduleWithoutUrl = modulePath.split('/').pop();
  if (moduleWithoutUrl) {
    const [name, version] = moduleWithoutUrl.split('@');
    return { name, version };
  }
  return { name: undefined, version: undefined };
};

export default getDetailsFromPath;
