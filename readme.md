![Logo](./logo.png)

# A component generator for React

![NPM Version](https://img.shields.io/npm/v/buildcom?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/foxleigh81/buildcom?style=for-the-badge)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/foxleigh81/buildcom?style=for-the-badge)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/foxleigh81/buildcom?style=for-the-badge)
![Travis (.org)](https://img.shields.io/travis/foxleigh81/buildcom?style=for-the-badge)
![npm](https://img.shields.io/npm/dt/buildcom?style=for-the-badge)

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

The component produced in this animation is available to view here: https://github.com/foxleigh81/buildcom/tree/master/examples/my-example-component

## Config file

You can specify some defaults by creating a `.buildcomrc` file in your home directory. It should look like this:

```yaml
# The folder the components will be generated in. This is relative to the current working directory.
output: "./components"
# Use TypeScript instead of JavaScript? Set to false or omit to disable.
typescript:
  # Where should the Prop Types be generated? Inline or separate file?
  inline: true
# Generate storybook stories for each component. Set to false or omit to disable.
storybook:
  # Use CSF or MDX to generate storybook stories
  use_mdx: true
  # Add parameters to the generated stories (one per line) (see https://storybook.js.org/docs/react/writing-stories/parameters#story-parameters for more info).
  params:
    # This is an example which will add a 'status' parameter to the story.
    - "status: { type: 'alpha' }"
# Generate tests for each component. (Only Jest is supported at the moment.) Set to false or omit to disable.
tests:
  # Filename format for test files can be either 'spec' or 'test', outputs as index.[choice].[ext], where [ext] is based on your answer to 'use_typescript'.
  extension: 'test'
# Generate a stylesheet for each component. Set to false or omit to disable.
styles:
  # Specify the CSS preprocessor to use, e.g. 'sass', 'less', 'stylus', 'scss', or 'none'.
  preprocessor: 'scss'
  # Use CSS modules?
  modules: true
# Generate a README.md file for each component (recommended unless using MDX for storybook stories).
generate_readme: false
# Generate additional directories for each component (e.g. 'images', 'helpers', 'mocks') (one per line).
# This isn't recommended unless you have a specific reason to do so, directories should be created on a per-component basis as needed.
directories: []
# If true, example code will be added to the component files. If false, the files will be empty.
prepopulate: true
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

If you call buildcom without any arguments and you are not using a config file the component folder will be created in your current working directory, it will also ask you some questions in order to build the component out properly.

You can also supply it with the following arguments:

Argument | Description | default
---- | ---- | ----
`--output` , `-o` | where to generate your new component (relative to your current working directory) | current directory
`--name`, `-n` | The name you want to call your component | n/a (required field)
`--dirs`, `-d` | Add extra directories as comma separated values | empty
`--storybook`, `-s` | Generate storybook file | false
`--mdx`, `-mdx` | Override the default CSF format and us MDX format for Storybook stories | false
`--test`, `-t` | Generate test file (only jest supported at the moment) | false
`--css`, `-c` | Generate stylesheet file (see 'CSS Generation' for details) | 'css'
`--modules`, `-m` | Usee CSS Modules (see 'CSS generation' for details) | false
`--typescript`, `-T` | Generate files with TypeScript extensions | false
`--readme`, `-r` | Generate files with TypeScript extensions | false
`--prepopulate`, `-p` | Don't add example code, just create empty files | false
`--force`, `-f` | Ignore existing folders and delete/recreate component files anyway | false
`--help`, `-h` | Displays the help text
`--version` | Displays version number

> Please note, the argument mode and question mode are the least flexible options. Using the .buildcomrc file is strongly recommended.

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
- If you generate a storybook file, that you have [Storybook] installed and configured to use the appropriate plugins for the type of stories you are generating.
- If you opt to use any variation of [CSS modules](https://github.com/css-modules/css-modules) that your project is already configured to make use of them.
- If you generate TypeScript files, that your project is already configured to use them

## Storybook

This project can output [Storybook] files for each component, for those of you who don't know what storybook is, here is a brief introduction:

[![Storybook intro video on YouTube](https://i.imgur.com/FDvR6zl.jpg)](https://www.youtube.com/watch?v=p-LFh5Y89eM)

You can output storybook files in the [CSF](https://storybook.js.org/docs/formats/component-story-format/) format or the [MDX](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/mdx.md) format instead, you can do this by either selecting it in the buildcom form, specifying it in the config file or adding the `--mdx` flag to the command (CSF format is default).

## Example

You can see an example output of this buildcom here: https://github.com/foxleigh81/buildcom/tree/master/examples/example

That component can be generated by running one of the following commands:

### If you are using the .buildcomrc file

```bash
buildcom example
```

### If you are using the argument mode
  
```bash
  buildcom --name "Example" --storybook --mdx --css="scss" --modules --typescript --prepopulate --test
```

or the shorthand version of the above:

  ```bash
  buildcom -n "Example" -c "scss" -mTpts -mdx
  ```

## 🚨 BREAKING CHANGES from v1.x.x 🚨

If you were using MDX syntax in your components, you will find that file that is generated has now changed, this is to 
bring it in line with the latest features available in Storybook. Your components should still generate fine, however
the format of any newly generated Storybook files will be different to any existing ones.

## 🚨 BREAKING CHANGES from v2.x.x 🚨

The main change is that the `.buildcomrc` file is in a different format, this is to make it easier to understand and extend. If you upgrade to this version but keep your old config file, buildcom WILL fail.

- File output formats have now changed, most of this is only cosmetic, however storybook files can now include parameters.
- The `--prepopulate` flag has replaced the `--blank` flag, which means blank files are now the default. If you want to keep the old behaviour, add `--prepopulate` or `-p` to the command line or add `prepopulate: true` to the config file.
- Support for Stylus has now been deprecated and will be removed in a future version. Scaffold files will no longer receive updates.
- Support for LESS has now been deprecated and will be removed in a future version. Scaffold files will no longer receive updates.

## FUTURE RELEASE NOTES

Buildcom is about to be renamed to `builda` in the next major release, this is to prepare it for some future additions I have planned, which make no sense with the current name. When this happens, the `buildcom` npm package will be deprecated and the `builda` npm package will be the new package. Whilst v4 will be a breaking change (it's a ground-up rewrite!) the current version will continue to work as it is
and will be preserved in the `buildcom` npm package - however it will receive no further updates.

### Notable changes coming in v4

- Support for `LESS` and `Stylus` has been removed - this is based on user feedback suggesting that literally none of my users use these pre-processors. If you are still using them, please let me know, if there is enough interest I will restore support for them.
- The `.buildcomrc` config file has been renamed to `.buildarc.yml`
- The 'questionnaire' mode has been removed for component generation, opting to use arguments along with the config file is now the recommended method.
- The `Questionaire` will still exist but will now be used to generate the config file.
- The struture of the scaffold files will be unified between formats (e.g. `css`/`scss`/`sass`, `js`/`ts` and `jsx`/`tsx` will all output similar files with the only difference being the extension and their own file type features)
- The default component styling will be a little more attractive and consistent.
- The `--name` argument will be dropped in favour of it being a positional argument, this will make it easier to use the command line and the config file.
- The package is being rewritten using TypeScript, this will make it easier to use and will make it easier to add new features in the future. The package output will still be compiled to regular JavaScript, so this will not affect the functionality of the package.

### Roadmap

This project has gained some traction in the recent months and as this was just a project I built for the use of myself and my team many years ago, I have not had much time to work on it - so I find the codebase a bit embarrassing now. I have been working on it for the past few months and have a few ideas for future features.

I personally use buildcom to generate components for my projects and over the years I've developed a very robust and reusable file structure, based on [next.js] and [storybook], so I plan to create a few tools to make generating items for that boilerplate easier as well
as a tool to generate the entire boilerplate itself. These will likely be namespaced packages under the `@builda` scope which I have recently bagsied. I have no idea about timescales for these but I'm hoping to do at least a few alpha releases of each package in the next couple of months.

## Support me

### Donate

I made this with love and of course it is free for you to use and modify however you see fit, however if you would like to buy me a coffee to say thanks, I certainly won't complain :)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I3I21FRCN)

### Patreon

I have a [Patreon](https://www.patreon.com/stelmosfire) where you can support me and help me keep this project alive. At the moment I only have a single 'Offer Support' tier but I'm sure I'll be adding more tiers in the future when I get around to fleshing out my page.

[![Patreon](https://img.shields.io/badge/patreon-support-brightgreen.svg)](https://patreon.com/buildcom)

[next.js](https://nextjs.org/)
[storybook](https://storybook.js.org/)

