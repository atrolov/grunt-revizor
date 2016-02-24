# grunt-revizor

> Grunt plugin for compression CSS classes and identifiers.
Exmaple: `.b-tabmenu__item--active__` -> `.zS`, `#success_info__` -> `.e6`

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

#### options.nameSuffix
Type: `String`
Default value: `'__'`

Prefix to which end the class names and identifiers to be compressed
Exmaple: `.b-tabmenu__item--active__` -> `.zS`

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

You can also use this option to minify string that are not CSS classes selectors. Be creative ;)

You don't need to add the dot nor the # in the begin of the strings in this array, nor you need to add the `options.nameSuffix`
in it. The grunt-revizor is smart enough to add it for you automatically.

```js
grunt.initConfig({
  revizor: {
    options: {
      nonCssFileSelectors: [
        '#selector-one',
        '.selector-two',
        'selector-three',
        'a-non-css-class-string',
      ]
    },
    src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js']
  },
});
```

All these strings are equivalents.   
```js
grunt.initConfig({
  revizor: {
    options: {
      nameSuffix: '__',
      nonCssFileSelectors: [
        '#selector',
        '.selector',
        '.selector__',
        '#selector__',
        'selector__',
        'selector',
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

#### options.reportNotMinifiedSelectors
Type: `Boolean`
Default value: `false`

Set `true` if you want to be notified about strings that match the prefix configured in `options.nameSuffix` but 
were ignored by grunt-revizor.   
An string will be ignored when it is not found inside your CSS files nether in the array `options.nonCssFileSelectors`.   
Read the documentation about `options.nonCssFileSelectors` for more details.


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
Name compress example: `.b-tabmenu__item--active__` -> `.zS`
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

#### Custom nameSuffix and filePrefix
```js
grunt.initConfig({
  revizor: {
    options: {
        nameSuffix: '--',
        compressFilePrefix: '.min'
    },
    src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js'],
    dest: 'build/'
  },
});
```
The result is a new compressed files in the directory `build`, with the prefix `.min`. Will compress all names that end with symbols `--`.
Name compress example: `.b-tabmenu--item__active--` -> `.xS`
File path example: `build/style1.min.css`, `build/style2.min.css`, `build/index.min.html`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2015-02-02   v0.1.0   Initial release.
