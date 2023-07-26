export const convertToBuildaScript = (key: string, value: string) => {
  if (
    value.startsWith('builda') ||
    value.startsWith('run-s') ||
    value.startsWith('run-p') ||
    value.startsWith('npm-run-all') ||
    value.startsWith('concurrently')
  ) {
    // We don't want to replace `builda`, `npm-run-all` or `concurrently` scripts, so we just copy them over
    // TODO: Add docs to show that builda scripts should not be used in conjunction with other scripts
    // add a suggestion to put the builda script in its own script and call that script from the other
    // script using one of the supported methods
    /**
     * e.g.
     * {
     *   "watch": "builda --watch",
     *   "dev": "run-p watch other-script"
     * }
     */
    return value;
  }
  return `builda x ${key}`;
};

export default convertToBuildaScript;
