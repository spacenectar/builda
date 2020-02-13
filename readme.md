# A component generator for react

[![Build Status](https://travis-ci.org/foxleigh81/ctgen.svg?branch=master)](https://travis-ci.org/foxleigh81/ctgen)


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

## Options (NOT YET IMPLEMENTED)

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
`-h` | Shorter alias for `--use-helpers`
`-s`  | Shorter alias for `--use-storybook`
`-j`  | Shorter alias for `--use-test`
`-c`  | Shorter alias for `--use-sass`
`-t`  | Shorter alias for `--use-ts`
`-b` | Shorter alias for `--blank`