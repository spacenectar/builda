# ![Builda Logo](https://raw.githubusercontent.com/spacenectar/builda/master/builda-logo.png)

[![NPM Version](https://img.shields.io/npm/v/builda?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/builda)
[![npm](https://img.shields.io/npm/dt/builda?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/builda)
[![GitHub issues](https://img.shields.io/github/issues/st-elmos-fire/builda?style=for-the-badge&logo=github)](https://github.com/st-elmos-fire/builda)
[![GitHub stars](https://img.shields.io/github/stars/st-elmos-fire/builda?style=for-the-badge&logo=github)](https://github.com/st-elmos-fire/builda)
![Codacy grade](https://img.shields.io/codacy/grade/2d431f518682497fb27036f95ec38599?style=for-the-badge)
[![Patreon](https://img.shields.io/badge/Patreon-Support-brightgreen?style=for-the-badge&logo=patreon)](https://www.patreon.com/builda?style=for-the-badge)

## What's this

Builda is a simple command-line tool to make building project elements fast and easy.

Builda generates files and folders using something called a 'scaffold', this is a
template that contains all the files and directories that you want to create as well
as a set of variables (called 'substitutions') that you can use to fill in the
template automatically.

## Screenshots

### Initialising builda

![Initialisation](https://raw.githubusercontent.com/spacenectar/builda/master/example/init.gif)

### Generate an atom component

![Generating an atom component](https://raw.githubusercontent.com/spacenectar/builda/master/example/generate-atom.gif)

The component produced in this animation is available to view here: [Component Example](https://github.com/spacenectar/builda/tree/master/example/test-component)

## Setup

You can either install `builda` as a global module or install it locally into your
project, if you choose to install it locally, you will need to run `npm run builda`
or `yarn builda` instead of just `builda`.

![NPM](https://img.shields.io/badge/npm-install_globally-red?style=for-the-badge&logo=npm)

```bash
npm i -g builda
```

![Yarn](https://img.shields.io/badge/yarn-install_globally-yellow?style=for-the-badge&logo=yarn)

```bash
yarn global add builda
```

![NPM](https://img.shields.io/badge/npm-install_locally-red?style=for-the-badge&logo=npm)

```bash
npm i --dev builda
```

![Yarn](https://img.shields.io/badge/yarn-install_locally-yellow?style=for-the-badge&logo=yarn)

```bash
yarn add -d builda
```

Then you can initialise builda by typing `builda --init` this will create a `.builda.json`
file in your project root. (see [Configuration](#configuration) below)

## Usage

Once you have installed builda, you can use it to build your project files.

## Configuration

You can specify some defaults by creating a `.builda.json` file in your home directory.

You can create this file manually or by running `builda --init`

[This section is incomplete and will be updated soon](#configuration)

## Generating files

When you run `builda --init`, you will generate a list of commands which can be
used to generate files.

For example, if you generated a `component` scaffold-type, you could run:

```bash
builda component my-example-component
```

This will generate a component called `my-example-component` in the directory specified
in the `.builda.json` file under the `component` command.

If you generated an `atom` scaffold-type, you could run:

```bash
builda atom my-example-atom
```

This will generate an atom called `my-example-atom` in the directory specified
in the `.builda.json` file under the `atom` command.

This is a powerful feature as not only does it allow you to specify the directory
to generate files in, it also allows you to specify the scaffold to generate from,
so if you had some components which needed to be typescript and others that
needed to be javascript, you can specify a different scaffold for each.

## Migrating from Buildcom

If you previously used the [buildcom](https://npmjs.com/package/buildcom) package
then please be aware that although this is the successor to buildcom,
it is a completely different package and is not backwards compatible.

If you rely on the legacy buildcom package, you may find that builda covers
all of the functionality of buildcom and then some. However as this is an early release,
you may find that you are better off staying with buildcom for now.

## Roadmap

- Add support for generating multiple components at once

- Add a larger selection of default scaffolds

- Create a website for builda with full documentation as well as a scaffold gallery

- Add the ability to easily generate your own scaffolds

- Add 'Prefabs' - These will allow you to generate an entire project with a
single command (Think 'create-react-app' but even more powerful)

- Add a command line only mode which will work without needing to initialise
builda or even install it locally

- Even more stuff!

## Support me

### Donate

I made this with love and of course it is free for you to use and modify however
you see fit, however if you would like to buy me a coffee to say thanks, I
certainly won't complain :)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/I3I21FRCN)

### Patreon

I have a [Patreon](https://www.patreon.com/stelmosfire) where you can support me
and help me keep this project alive. At the moment I only have a single 'Offer
Support' tier but I'm sure I'll be adding more tiers in the future when I get
around to fleshing out my page.

[next.js](https://nextjs.org/)
[storybook](https://storybook.js.org/)
