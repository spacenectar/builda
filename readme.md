![Logo](./logo.png)

# A component generator for React

![NPM Version](https://img.shields.io/npm/v/buildcom?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/foxleigh81/buildcom?style=for-the-badge)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/foxleigh81/buildcom?style=for-the-badge)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/foxleigh81/buildcom?style=for-the-badge)
![Travis (.org)](https://img.shields.io/travis/foxleigh81/buildcom?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/buildcom?style=for-the-badge)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/foxleigh81/buildcom?style=for-the-badge)

## Getting Started

The easiest way to use this is with npx:

```bash
npx buildcom
```

If you wish to use it without an internet connection or if you are planning to use it multiple times (NPX is slower) then you can install and use it locally:

```bash
npm install -g buildcom
```

Then you can run it by typing `buildcom`

This will generate a react component in your current working directory.

## Screenshot

![How buildcom runs](./example.gif)

## Config file

You can specify some defaults by creating a `.buildcomrc` file in your home directory. It should look like this:

```yaml
    # The folder the components will be generated in. This is relative to the current working directory.
    output: "./src/components"
    # Output components in TypeScript format (outputs as regular JavaScript files if false).
    use_typescript: true
    # Generate storybook stories for each component.
    use_storybook: true
    # Use MDX for storybook stories (uses CSF if false).
    story_format_mdx: false
    # Generate Jest tests for each component.
    use_jest: true
    # Filename format for test files can be either 'spec' or 'test', outputs as index.[choice].[ext].
    test_file_name: 'spec'
    # Output a stylesheet?
    output_stylesheets: true
    # Specify the CSS preproccessor to use, e.g. 'sass', 'less', 'stylus', 'scss', or 'none'.
    css_preprocessor: 'sass'
    # use the CSS module format?
    css_modules: false
    # Output component types in their own subfolder (will output in the components index file if false).
    create_types_subfolder: false
    # Generate a README.md file for each component.
    generate_readme: true
    # If true, example code will be added to the component files. If false, the files will be bare-bones.
    output_example_code: true
```

If you are using the `.buildcomrc` file you can run the `buildcom` command by itself and it will only ask one what to name
your component. You can also specify the name of the component in the command line:

```bash
buildcom my-component
```

This will generate a component called `my-component` in the directory specified in the `.buildcomrc` file.

You can also use this method to create multiple components at once:

```bash
    buildcom my-component my-other-component
```

This is the only way to create multiple components at once, so this command is very useful, especially at the start of a new project.

## Options

If you call buildcom without any arguments, the component folder will be created in your current working directory (or the directory specified in your `.buildcomrc` file), it will also ask you some questions in order to build the component out properly.

You can also supply it with the following arguments:

Argument | Description | default
---- | ---- | ----
`--output` , `-o` | where to generate your new component (relative to your current working directory) | current directory
`--name`, `-n` | The name you want to call your component | n/a (required field)
`--dirs`, `-d` | Add extra directories as comma separated values | empty
`--storybook`, `-s` | Generate storybook file | false
`--mdx`, `-mdx` | Override the default CSF format and us MDX format for Storybook stories | false
`--jest`, `-j` | Generate jest test file | false
`--css`, `-c` | Generate stylesheet file (see 'CSS Generation' for details) | 'css'
`--modules`, `-m` | Usee CSS Modules (see 'CSS generation' for details) | false
`--typescript`, `-t` | Generate files with TypeScript extensions | false
`--readme`, `-r` | Generate files with TypeScript extensions | false
`--blank`, `-b` | Don't add example code, just create empty files | false
`--force`, `-f` | Ignore existing folders and overwrite/create component files anyway | false
`--help`, `-h` | Displays the help text
`--version` | Displays version number

> Please note, the argument mode is currently the least flexible option, we will add more options in the future but for now you can use the config file or the questionaire.
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

Buildcom makes the following assumptions about your dependencies:

- That you are using [React](https://reactjs.org/)
- If you generate a CSS file for a particular pre-processor, that you already have that pre-processor configured for use in your project
- If you generate a test file, that you already have Jest or testing-library installed and configured for use in your project
- If you generate a storybook file, that you have [Storybook](https://storybook.js.org/) installed and configured to use the appropriate plugins for the type of stories you are generating.
- If you opt to use any variation of [CSS modules](https://github.com/css-modules/css-modules) that your project is already configured to make use of them.
- If you generate TypeScript files, that your project is already configured to use them

If in doubt, feel free to look through our sample configs which can be found [here](examples/example-project-config)

## Storybook

This project can output Storybook files for each component, for those of you who don't know what storybook is, here is a breif introduction:

[![Storybook intro video on YouTube](https://i.imgur.com/FDvR6zl.jpg)](https://www.youtube.com/watch?v=p-LFh5Y89eM)

By default, buildcom outputs storybook files in the [CSF](https://storybook.js.org/docs/formats/component-story-format/) format but if you would prefer to use the [MDX](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/mdx.md) syntax instead, you can do this by either selecting it in the buildcom form, specifying it in the config file or adding the `--mdx` flag to the command

## Example 

You can see an example output of this buildcom here: https://github.com/foxleigh81/buildcom/tree/master/example-component

The command used to generate that component was:

```bash
buildcom --name "example component" -sjr -d 'images' --css "scss"
```

## 🚨 BREAKING CHANGES from v1.x.x 🚨

If you were using MDX syntax in your components, you will find that file that is generated has now changed, this is to 
bring it in line with the latest features available in Storybook. Your components should still generate fine, however
the format of any newly generated Storybook files will be different to any existing ones.

## Possible future developments
- Add the ability to generate for frameworks other than React.
- Renames files instead of needing an exact copy to exist in the scaffold folder, will allow for more flexibility of naming choices.
## Known issues
- The latest release has rendered the old tests defunct, I don't have time to update them right now but this does not affect the functionality of the project.
