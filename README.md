# ![Builda Logo](https://raw.githubusercontent.com/spacenectar/builda-app/master/builda-logo.png)

[![NPM Version](https://img.shields.io/npm/v/builda?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/builda)
[![npm](https://img.shields.io/npm/dt/builda?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/builda)
[![GitHub issues](https://img.shields.io/github/issues/spacenectar/builda-app?style=for-the-badge&logo=github)](https://github.com/spacenectar/builda-app)
[![GitHub stars](https://img.shields.io/github/stars/spacenectar/builda-app?style=for-the-badge&logo=github)](https://github.com/spacenectar/builda-app)
![Codacy grade](https://img.shields.io/codacy/grade/2d431f518682497fb27036f95ec38599?style=for-the-badge)
[![Patreon](https://img.shields.io/badge/Patreon-Support-brightgreen?style=for-the-badge&logo=patreon)](https://www.patreon.com/builda?style=for-the-badge)

> **NOTE:** This readme file is a mess as it is a work in progress.
> Please bear with me, I will clean it up and add more information soon.
> Also, the example blueprints and prefabs listed below are not yet available
> but will be soon.

## What's this

Builda is a simple command-line tool to make building project elements fast and easy.

Builda generates files and folders using something called a 'blueprint', this is
a template that contains all the files and directories that you want to create as
well as a set of variables (called 'substitutions') that you can use to fill in
the template automatically.

You can also build entire projects using super-powered blueprints known as 'prefabs'
(see [Prefabs](#prefabs) below).

## Screenshots

Coming soon...

## Setup

### Installation

You can either install `builda` as a global module or install it locally into your
project, if you choose to install it locally, you will need to run `npm run builda`
or `yarn builda` instead of just `builda`.

![NPM](https://img.shields.io/badge/npm-install_globally-red?style=for-the-badge&logo=npm)

```shell
npm i -g builda
```

![Yarn](https://img.shields.io/badge/yarn-install_globally-yellow?style=for-the-badge&logo=yarn)

```shell
yarn global add builda
```

![NPM](https://img.shields.io/badge/npm-install_locally-red?style=for-the-badge&logo=npm)

```shell
npm i --dev builda
```

![Yarn](https://img.shields.io/badge/yarn-install_locally-yellow?style=for-the-badge&logo=yarn)

```shell
yarn add -D builda
```

Then you can initialise builda by typing `builda --init` this will create a `.builda`
directory in your project root. (see [Configuration](#configuration) below)

### Configuration

> **Note:** If you want to use a prefab, you do not need to run `builda --init`
> (see [Prefabs](#prefabs) below)

You can specify some defaults by updating the `builda` object in your `package.json` file.

[This section is incomplete and will be updated soon](#configuration)

## Installing modules

Builda has two different types of modules, 'blueprints' and 'prefabs'.

You can install blueprints by running `builda add <blueprint-path>`

Installing prefabs is a little different. Instead of installing a prefab,
you initialise a project using a prefab.

The command to do that is `builda project <prefab-path>`

### Prefixes

You can put the full path to the module as a url if you wish or you can use
a prefixed path (known in Builda as a 'resolver')

e.g. The following command will install the 'arctic-fox' blueprint:

```shell
builda add builda:arctic-fox
```

The `builda:` prefix tells builda to look at the module registry on the builda
trade-store for the appropriate module.

Builda also supports the following prefixes:

#### `github:` prefix to install modules from GitHub

e.g. The following command will install the 'arctic-fox' blueprint from the
GitHub user 'builda-modules':

```shell
builda install github:builda-modules/arctic-fox
```

#### `bitbucket:` prefix to install modules from BitBucket

e.g. The following command will install the 'arctic-fox' blueprint from the
BitBucket user 'builda-modules':

```shell
builda install bitbucket:builda-modules/arctic-fox
```

> NOTE: github and bitbucket prefixes require a release tag of 'latest' to exist
> in order to install the module.

#### Custom prefixes

You can also specify custom prefixes by adding them to the `config.json` file under
`resolve`:

```json
{
  "resolve": {
    "sn": "https://spacenectar.io/builda/modules"
  }
}
```

Then you could install 'custom-blueprint' from the spacenectar website by running:

```shell
builda add sn:custom-blueprint
```

## Usage

### Useful commands

#### `builda init`

Initialises builda in your project. This will create a `.builda` directory in your
project root and a `config.json` file inside that.
(see [Configuration](#configuration) below)

#### `builda project <prefab-path>`

Initialises a new project using a prefab. (see [Prefabs](#prefabs) below)

#### `builda new <thing>`

Creates a new thing from a bluebrint (see [Blueprints](#blueprints) below)

<!-- #### `builda --index`

Generates an index file any directories specified in 'indexes' in the config
file. (see [Indexing](#indexing) below) -->

#### `builda --help`

Displays the help menu.

### Blueprints

Blueprints can be used to generate files and folders in your project.

Once you have added a blueprint you then need to edit your `builda` entry in your
`package.json` file to tell builda where to put the output of the blueprint.

Once you have installed a blueprint, you will see a `blueprints` entry in your
builda config. After that entry, you can add a `scripts` entry which will contain
a list of scripts that you can run to generate files and folders.

For example, if you installed the `arctic-fox` blueprint, you would see the
following in your `package.json` file:

```json
{
  "builda": {
    "blueprints": {
      "arctic-fox": {
        "version": "1.0.0",
        "location": "builda:arctic-fox"
      }
    }
  }
}
```

You can add a `scripts` entry below this like so:

```json
{
  "builda": {
    "blueprints": {
      "arctic-fox": {
        "version": "1.0.0",
        "location": "builda:arctic-fox"
      }
    },
    "scripts": {
      "component": {
        "use": "arctic-fox",
        "outputDir": "src/components"
      }
    }
  }
}
```

This tells builda that any time you want to generate a new `component` it should
use the `arctic-fox` blueprint and put the output in the `src/components` directory.

```shell
builda new component --name my-example-component
```

This will generate a component called `my-example-component` in the `src/components`
directory using the `arctic-fox` blueprint.

This is a powerful feature as not only does it allow you to specify the directory
to generate files in, it also allows you to specify the blueprint to generate from,
so you can specify a different blueprint for each type of thing you want to generate.

e.g. You could have a `component` script which uses the `arctic-fox` blueprint and
a `page` script which uses the `arctic-wolf` blueprint.

<!-- ## Indexing

Builda can generate an index file for any directories you specify in the config
file. This is useful if you want to import files from a directory without having
to specify the full path.

For example, if you have a directory called `components` and you want to import
a component called `my-component`, you could do this:

```javascript
import MyComponent from './components/my-component';
```

But if you have an index file, you can do this:

```javascript
import { MyComponent } from './components';
```

Indexing is a little basic at the moment, it just generates an index file which
exports the default export of any index file it files in the directory
(excluding the index file itself) and any sub-directories. The name of the
export is the name of the containing directory.

This will be improved in the future.

### Configuring indexing

To configure indexing, you need to add an `indexes` property to your config file.
Within this property, you can specify an array of directories to index.

You can also specify a file extension to use for the index file. If you do not
specify an extension, the default is `.ts`.

```json
{
  "indexes": {
    "directories": ["components", "atoms"],
    "extension": ".ts"
  }
}
``` -->

## Prefabs

Blueprints are a great way to build parts of your project, but sometimes you want
to build out an entire project. This is where prefabs come in.

A prefab is essentially a massive blueprint, which contains all of the
files and directories that you would need to build a project.

A prefab does differ a little from a blueprint in that it is not designed to be
modified once it has been created, all prefab files live inside the .builda
directory and you use a `builda` command to run your application and keep your
project files in sync.

### Why?

The purpose of a prefab is to effectively turn the core parts of your project
into a package. This means that you can use the same prefab to build out
multiple projects and when you want to update that prefab, a single command
inside any project that uses that prefab will pull in the latest changes.

The core of your application is now basically just config. Leaving you free
to focus on individual features.

### Ok but what if I want parts of the project to be different?

No problem! You can just `eject` the files you want to update from the prebabs folder
into the root of your project. Provided that the paths match up, the files in the
root will take precedence over the files in the prefab. This of course means that
these files will no longer receive updates when the prefab is updated and you
will need to manually update the files in the root if you want them to be updated.

> **COMING SOON:** Prefab migration is on the roadmap. So manually updating the
> files in the root will eventually be more like a git merge, only requiring manual
> intervention to resolve conflicts.

### Using prefabs

A prefab is an entire project. So rather than installing a prefab as you do with
a blueprint. You would initialise builda with the `project` command and then
specify the prefab you want to use.

```shell
builda project builda:jackanory
```

This will build out your new project using the `jackanory` prefab.

> **COMING SOON:** Prefab partials are on the roadmap. This will allow you to
> add prefabs to existing projects and have only parts of the project connected
> to a prefab. This would be useful if you wanted to add a preconfigured
> package to your project (e.g. storybook) and wanted to keep that preconfiguration
> in sync with the rest of your projects but still leave the rest of your project
> as a standalone project.

## Migrating from Buildcom

If you previously used the [buildcom](https://npmjs.com/package/buildcom) package
then please be aware that although this is the successor to buildcom,
it is a completely different package and is not backwards compatible.

If you rely on the legacy buildcom package, you may find that builda covers
all of the functionality of buildcom and then some. However as this is an early
release, you may find that you are better off staying with buildcom for now.

## Roadmap

- Add support for generating multiple components at once

- Add a selection of default blueprints

- Create a website for builda with full documentation

- Add the ability to easily generate your own blueprints

- Create a community marketplace for blueprints and prefabs.

- Add support for migrating to new prefabs without having to manually update custom
  files.

- Add prefab partials to allow smaller parts of your project to be prefabs but not
  the whole project.

- Even more stuff!

## Get support / discuss builda

I've set up a [GitHub Discussions board](https://github.com/spacenectar/builda-app/discussions)
for builda. Feel free to post questions, bugs, suggestions, or just to chat.

## Contribute

Builda is not yet set up to receive contributions, but if you would like to help
then please feel free to post questions, suggestions or bug reports on the
discussions board (link above). I will be happy to review any pull requests you may
have but it makes sense to wait until I release the docs and tools which will make
contributing much easier.

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

## How to create a blueprint

Coming soon...

## How to create a prefab

At the moment, this is a manual process. I will be adding a tool to make this
easier in the future.

### Creating the prefab

A prefab requires the following files and directories:

- registry.json - This is the registry file for the prefab. It is used to
  register the prefab with builda and to specify the name of the prefab.
- README.md - This is the readme file for the prefab. It is used to provide
  information about the prefab and how to use it.
- A 'modules' directory - This is the directory where all of the files for the
  prefab are stored.

You can add other files and directories to the prefab if you want, but these
will be ignored by builda. If you don't want to install builda globally, you can
add a package.json file to the root and install builda as a dev dependency.
