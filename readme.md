![Logo](./logo.png)

# A component generator for React

## Getting Started

The easiest way to use this is with npx:

```bash
npx buildcom
```

If you wish to use it without an internet connection then you can install and use it locally:

```bash
npm install -g buildcom
```

Then you can run it by typing `buildcom`

This will generate a react component in your current working directory.

## Screenshot

![How buildcom runs](./example.gif)

## Options 

If you call buildcom without any arguments, the component folder will be created in your current working directory, it will also ask you some questions in order to build the component out properly.

You can also supply it with the following arguments:

Argument | Description | default
---- | ---- | ----
`--output` , `-o` | where to generate your new component (relative to your current working directory) | current directory
`--name`, `-n` | The name you want to call your component | n/a (required field)
`--dirs`, `-d` | Add extra directories as comma separated values | empty
`--storybook`, `-s` | Generate storybook file | false
`--jest`, `-j` | Generate jest test file | false
`--css`, `-c` | Generate sass module file | false
`--typescript`, `-t` | Generate files with TypeScript extensions | false
`--readme`, `-r` | Generate files with TypeScript extensions | false
`--blank`, `-b` | Don't add example code, just create empty files | false
`--force`, `-f` | Ignore existing folders and overwrite/create component files anyway | false
`--help`, `-h` | Displays the help text
`--version` | Displays version number

## Roadmap

- Make the TypeScript selection do more than just change the file extension
- Add the ability to generate blank files
- Add the abiltiy to choose the directory to generate the components
- Add support for stylesheets which are not SASS modules
- Add support for non-MDX storybook files

## Possible future developments
- Add the ability to generate for frameworks other than React
