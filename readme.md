![Logo](./logo.png)

# A component generator for React

## Getting Started

The easiest way to use this is with npx:

```bash
npx buildcom
```

If you wish to use it without an internet connection then you can install and use it locally:

```bash
npm install -g buildcon
```

Then you can run it by typing `buildcon`

This will generate a react component in your current working directory.

## Screenshot

![How buildcom runs](./example.gif)

<!-- ## Options (NOT YET IMPLEMENTED)

If you call buildcom without any arguments, the component folder will be created in your current working directory, it will also ask you some questions in order to build the component out properly.

You can also supply it with the following arguments:

Argument | Description | default
---- | ---- | ----
`--output` | where to generate your new component (relative to your current working directory) | current directory
`--name` | The name you want to call your component | 'My New Component'
`--add-directories` | Add extra directories as comma separated values | No directories
`--use-storybook` | Generate storybook file | true
`--use-jest` | Generate jest test file | true
`--use-sass` | Generate sass module file | false
`--use-ts` | Generate files with TypeScript extensions | true
`--blank` | Don't add example code, just create empty files | false
`-o` | Shorter alias for `--output`
`-n` | Shorter alias for `--name`
`-i` | Shorter alias for `--use-images`
`-d` | Shorter alias for `--use-helpers`
`-j`  | Shorter alias for `--use-test`
`-c`  | Shorter alias for `--use-sass`
`-t`  | Shorter alias for `--use-ts`
`-b` | Shorter alias for `--blank` -->

## Roadmap

- Add the ability to use command line arguments
- Make the TypeScript selection do more than just change the file extension
- Add the ability to generate blank files
- Add the abiltiy to choose the directory to generate the components
- Add support for stylesheets which are not SASS modules

## Possible future developments
- Add the ability to generate for frameworks other than React
