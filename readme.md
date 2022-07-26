# ![Logo](./builda-logo.png)

[![NPM Version](https://img.shields.io/npm/v/builda?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/builda)
[![npm](https://img.shields.io/npm/dt/builda?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/builda)
[![GitHub issues](https://img.shields.io/github/issues/st-elmos-fire/builda?style=for-the-badge&logo=github)](https://github.com/st-elmos-fire/builda)
[![GitHub stars](https://img.shields.io/github/stars/st-elmos-fire/builda?style=for-the-badge&logo=github)](https://github.com/st-elmos-fire/builda)
![Codacy grade](https://img.shields.io/codacy/grade/2d431f518682497fb27036f95ec38599?style=for-the-badge)
[![Patreon](https://img.shields.io/badge/Patreon-Support-brightgreen?style=for-the-badge&logo=patreon)](https://www.patreon.com/builda?style=for-the-badge)

## Setup

You can either install `builda` as a global module or install it locally into your
project, if you are using the `.builda.yml` file, installing locally is recommended.

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

Then you can initialise builda by typing `builda --init` this will create a `.builda.yml`
file in your project root. (see [Configuration](#configuration) below)

## Usage

Once you have installed builda, you can use it to build your project files.

## Screenshot

![How builda runs](./example.gif)

The component produced in this animation is available to view here: https://github.com/foxleigh81/builda/tree/master/examples/my-example-component

## Configuration

You can specify some defaults by creating a `.builda.yml` file in your home directory.

You can create this file manually or by running `builda --init`

> 🚨 **WARNING** : If you're coming from the `buildcom` project, you might want
> to migrate instead of initialising. See [Migrating](#migrating-from-buildcom) below.

```bash
builda my-component
```

This will generate a component called `my-component` in the directory specified
in the `.builda.yml` file.

You can also use this method to create multiple components at once:

```bash
    builda my-component my-other-component
```

## Migrating from Buildcom

If you previously used the [buildcom](https://npmjs.com/package/buildcom) package
then please be aware that although this is the spiritual successor to buildcom,
it is a completely different package. It is not compatible with buildcom.

If you rely on the legacy buildcom package, you may find that builda covers
all of the functionality of buildcom and then some.

Take a look in our [scaffold marketplace](/coming-soon) to see if there is a
scaffold that suits your needs, alternatively, it's pretty easy to [create your
own scaffolds](/coming-soon).

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
