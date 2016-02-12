# grunt-revizor

> Grunt plugin for compression CSS classes and identifiers.
Exmaple: `.b-tabmenu--item__active--` -> `.zS`, `#success_info--` -> `.e6`

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-revizor --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-revizor');
```

### Options

#### options.namePrefix
Type: `String`
Default value: `'--'`

Prefix to which end the class names and identifiers to be compressed
Exmaple: `.b-tabmenu--item__active--` -> `.zS`

#### options.compressFilePrefix
Type: `String`
Default value: `'-min'`

The prefix for the name of the compressed file. The final name of the new file is equal to the original file name plus a prefix plus the extension of the original file.
Example: `style1.css` -> `style-min.css`

#### options.nonCssFileSelectors
Type: `Array`
Default value: []

By default grunt-revizor minifies only classes and IDs that exist within your CSS files. We do this to avoid replace
strings by mistake from your non-css files (like JS, PHP, HTML, etc).
But sometimes there are CSS classes and IDs that exists only within non-css files. It happens, for example, when you 
create a CSS ID only because you need to find that element from within a JS code. Example: `$(#some-selector)`    
Often these selectors are not referenced in your CSS causing grunt-revizor to ignore them.

Use this option to let grunt-revizor know which are the CSS class and IDs that should be minified even that it is not present in your CSS file.
Using this option grunt-revizor can safe minify selectors inside your no-css files without make a mistake.

```js
grunt.initConfig({
  revizor: {
    options: {
      nonCssFileSelectors: [
        '#select-one',
        '.selector-two'
      ]
    },
    src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js']
  },
});
```

#### options.flatten
Type: `Boolean`
Default value: `true`

Set `false` if you want to save the directory structure

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  revizor: {
    options: {},
    src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js']
  },
});
```
The result is a new compressed files in the same directory specified in the src, with a standard prefix.
Name compress example: `.b-tabmenu--item__active--` -> `.zS`
Example: `test/css/style1-min.css`, `test/css/style2-min.css`, `test/html/index-min.html`


#### Custom Options
#### Save all compressed files in a single directory
```js
grunt.initConfig({
  revizor: {
    options: {},
    src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js'],
    dest: 'build/'
  },
});
```
The result is a new compressed files in the directory `build`, with a standard prefix.
Example: `build/style1-min.css`, `build/style2-min.css`, `build/index-min.html`

#### Save directory tree
```js
grunt.initConfig({
  revizor: {
    options: {
        flatten: false
    },
    src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js'],
    dest: 'build/'
  },
});
```
The result is a new compressed files in the directory `build`, with a standard prefix.
Example: `build/test/css/style1-min.css`, `build/test/css/style2-min.css`, `test/html/index-min.html`

#### Custom namePrefix and filePrefix
```js
grunt.initConfig({
  revizor: {
    options: {
        namePrefix: '__',
        compressFilePrefix: '.min'
    },
    src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js'],
    dest: 'build/'
  },
});
```
The result is a new compressed files in the directory `build`, with the prefix `.min`. Will compress all names that end with symbols `__`.
Name compress example: `.b-tabmenu__item--active__` -> `.xS`
File path example: `build/style1.min.css`, `build/style2.min.css`, `build/index.min.html`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2015-02-02   v0.1.0   Initial release.
