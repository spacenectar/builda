type BlueprintScriptContent = {
  use: string;
  outputDir: string;
  substitute?: TSubstitution[] | [];
  variants: {
    name: string;
    outputDir: string;
  }[];
};

interface BlueprintScriptConfig<T> {
  [key: string]: BlueprintScriptContent | T;
}
