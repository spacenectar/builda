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
`--css`, `-c` | Generate stylesheet file (see 'CSS Generation' for details) | 'css'
`--modules`, `-m` | Usee CSS Modules (see 'CSS generation' for details) | false
`--typescript`, `-t` | Generate files with TypeScript extensions | false
`--readme`, `-r` | Generate files with TypeScript extensions | false
`--blank`, `-b` | Don't add example code, just create empty files | false
`--force`, `-f` | Ignore existing folders and overwrite/create component files anyway | false
`--help`, `-h` | Displays the help text
`--version` | Displays version number

## CSS Generation

The following options exist for CSS usage:

- CSS
- SASS
- SCSS
- Stylus
- LESS

If you are using the questionnaire, this is covered in the questions. If using arguments then you can choose from the following options:

Stylesheet type | option
--- | ---
CSS | `--css "css"`
SCSS | `--css "scss"`
SASS | `--css "sass"`
Stylus | `--css "stylus"`
LESS | `--css "less"`

Each file is also available as a [css module](https://github.com/css-modules/css-modules) by adding an additional `--modules` or `-m` argument.

e.g.

The following will output a CSS Module file (`styles.modules.css`)

```bash
buildcom --name "My Component" --css "css" -m 
```

## Project Assumptions

Buildcon makes the following assumptions about your dependencies:

- That you are using [React](https://reactjs.org/)
- If you generate a CSS file for a particular pre-processor, that you already have that pre-processor configured for use in your project
- If you generate a test file, that you are using Jest for unit tests, that you have '[react-test-renderer](https://www.npmjs.com/package/react-test-renderer)' installed for DOM tests and that you are using `.spec.*` as your file extension
- If you generate a storybook file, that you have [Storybook](https://storybook.js.org/) installed and configured to use the [MDX documenting](https://www.npmjs.com/package/@storybook/addon-docs#mdx) method using the '[docs](https://www.npmjs.com/package/@storybook/addon-docs)' addon.
- If you opt to use any variation of [CSS modules](https://github.com/css-modules/css-modules) that your project is already configured to make use of them.
- If you generate TypeScript files, that your project is already configured to use them

## Roadmap

- Make the TypeScript selection do more than just change the file extension
- Add support for non-MDX storybook files
- Some serious refactoring
- Add unit tests

## Possible future developments
- Add the ability to generate for frameworks other than React
