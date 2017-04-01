# gulpfile.js

gulpfile.js is a delicious blend of tasks and build tools poured into [Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. You can easily be integrated to the development environment and site or app structure.


## Usage

Make sure Node installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions.

### Install Dependencies

If you use this library the first time, you need to be shure all global dependencies are installed correctly:

```bash
# Install Yarn
brew update
brew install yarn
# Uninstall Gulp
npm uninstall --global gulp gulp-cli
# Install ScssLint
gem install scss_lint
# Install some plugins globally
npm install --global gulp-cli eslint
```

If the global dependencies are installed, you can install the rest with **`yarn`**.

### Run Gulp

If you have gulp installed globally, you can simple run `gulp`, optional with some flags. With `gulp -T` you can print out all the options.
If there's a global gulp in a different version, you have to use this commands:

Command             | Watcher | Behaviour
------------------- | ------- | ---------------------------------------------------------
`yarn start`        |    x    | Generates all Assets, Javascript and CSS files
`yarn run tasks`    |         | Show all available tasks
`yarn run beautify` |    x    | Beautify and dont't compress files
`yarn run debug`    |    x    | Files dont't get compressed and sourcemaps get genereated
`yarn run maps`     |    x    | Write sourcemaps
`yarn run build`    |         | Runs the build process for production
`yarn run css`      |         | Render CSS Files
`yarn run scss`     |         | Render `_all.scss` and `_allsub.scss` Files
`yarn run js`       |         | Render Javascript Files
`yarn run images`   |         | Optimize images and overrite them in the source folder


## Overview

Features       | Tools Used
-------------- | ---------------------
**CSS**        | [Sass](http://sass-lang.com) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)) and [PostCSS](http://postcss.org)
**Javascript** | [Rollup JS](http://rollupjs.org) with [Bublé](https://buble.surge.sh/guide) or [Babel](https://babeljs.io/)
**Images**     | Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin). Run width `gulp optimizeImages`. Overwrites files in the resource folder.
**Icons**      | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore) and/or [Icon Fonts](https://www.npmjs.com/package/gulp-iconfont)
**Lint**       | [ScssLint](https://github.com/brigade/scss-lint) and [ESLint](http://eslint.org/) included

You can configure the behaviour with the `gulp.json` in the root folder. To turn of a certain task, for example, just do it like this:

```json
{
	"tasks": {
		"js": false
	}
}
```

Take a look into `config.json` the figure out which options are available. The script loads also the informations (`description`, `author` and `homepage` entry) from `composer.json`


## CSS

### SCSS

These small helpers can make your developer life much easier. These files get filled automatically by the gulp task `scss`

Filename             | Description
-------------------- | ----------------------
**`_all.scss`**      | Every file from the same directory get an `@import` statement. Files with beginning underscore (`_`) get ignored.
**`_allsub.scss`**   | Every file from sub directories an `@import` statement. Files and folders with beginning underscore (`_`) get ignored.


### PostCSS

Following plugins are included:

Plugin                                                                                  | Description
--------------------------------------------------------------------------------------- | ----------------------
**[css-mqpacker](https://www.npmjs.com/package/css-mqpacker)**                          | Pack same CSS media query rules into one media query rule.
**[cssnano](http://cssnano.co)**                                                        | Minify & autoprefix final css files
**[pleeease-filters](https://www.npmjs.com/package/pleeease-filters)**                  | Convert CSS shorthand filters to SVG ones
**[postcss-assets](https://www.npmjs.com/package/postcss-assets)**                      | PostCSS plugin to manage assets
**[postcss-center](https://www.npmjs.com/package/postcss-center)**                      | PostCSS plugin to center elements
**[postcss-fixes](https://www.npmjs.com/package/postcss-fixes)**                        | PostCSS plugin to fix known Browser Bugs.
**[postcss-flexbox](https://www.npmjs.com/package/postcss-flexbox)**                    | Flexbox layouts made easy with PostCSS
**[postcss-grid-kiss](https://www.npmjs.com/package/postcss-grid-kiss)**                | A PostCSS plugin to keep CSS grids stupidly simple
**[postcss-pseudoelements](https://www.npmjs.com/package/postcss-pseudoelements)**      | PostCSS plugin to add single-colon CSS 2.1 syntax pseudo selectors (i.e. :before)
**[postcss-quantity-queries](https://www.npmjs.com/package/postcss-quantity-queries)**  | PostCSS plugin enabling quantity-queries
**[postcss-reporter](https://www.npmjs.com/package/postcss-reporter)**                  | Log PostCSS messages in the console
**[postcss-round-subpixels](https://www.npmjs.com/package/postcss-round-subpixels)**    | Plugin that rounds sub-pixel (eg: 12.87378px) values to the nearest full pixel.
**[postcss-rtl](https://www.npmjs.com/package/postcss-rtl)**                            | PostCSS plugin for RTL-optimizations. Turned off by default
**[postcss-selector-matches](https://www.npmjs.com/package/postcss-selector-matches)**  | PostCSS plugin to transform :matches() W3C CSS pseudo class to more compatible CSS selectors
**[postcss-selector-not](https://www.npmjs.com/package/postcss-selector-not)**          | PostCSS plugin to transform :not() W3C CSS leve 4 pseudo class to :not() CSS level 3 selectors
**[postcss-short](https://www.npmjs.com/package/postcss-short)**                        | Short creates and extends shorthand properties in CSS
**[postcss-vmax](https://www.npmjs.com/package/postcss-vmax)**                          | Use vmax units in Edge and Internet Explorer
**[rucksack-css](https://simplaio.github.io/rucksack/)**                                | A little bag of CSS superpowers

## Plugins for Editors

### [Atom](https://atom.io/)

Package | Command
------- | -------
[ScssLint](https://atom.io/packages/linter-scss-lint) | `apm install linter-scss-lint`
[ESLint](https://atom.io/packages/linter-eslint) | `apm install linter-eslint`
[Fusion](https://atom.io/packages/language-typoscript2) | `apm install language-typoscript2`

### [PhpStorm](https://www.jetbrains.com/phpstorm/) and [WebStorm](https://www.jetbrains.com/webstorm/)

* [ScssLint](https://plugins.jetbrains.com/plugin/7530)
* [ESLint](https://plugins.jetbrains.com/plugin/7494)
* [Neos](https://www.neos.io/blog/the-neos-intellij-plugin.html)


License
-------

Licensed under MIT, see [LICENSE](LICENSE)
