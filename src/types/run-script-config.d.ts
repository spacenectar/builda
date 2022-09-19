export interface RunScriptConfig {
  [key: string]: {
    /**
     * The command to run
     */
    run: string;
    /**
     * A prefix to add to the command
     */
    prefix?: string;
    /**
     * A suffix to add to the command
     */
    suffix?: string;
    /**
     * The working directory to run the command in (relative to the app root)
     */
    cwd?: string;
  };
}
export default RunScriptConfig;
