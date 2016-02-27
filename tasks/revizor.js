/*
 * grunt-revizor
 * https://github.com/atrolov/grunt-revizor
 *
 * Copyright (c) 2015 Artem Frolov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('revizor', 'Grunt plugin for compression CSS classes and identifiers.', function() {
    var cssFiles = [],
      filesForCompress = [],
      compressedNames = {},
      namesLegth = 0,
      zipNames = {},
      destDir = this.data.dest || null,
      firstCharList,
      OtherCharsList,
      notFound = {},
      options;


    options = this.options({
      nameSuffix: '__',
      flatten: true,
      nonCssFileSelectors: [],
      reportNotMinifiedSelectors: false,
      compressFilePrefix: '-min'
    });

    if (options.namePrefix) {
      options.nameSuffix = options.namePrefix;
      delete options.namePrefix;
    }

    function escapeRegExp(string){
      // From Mozilla Developer Network
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?redirectlocale=en-US&redirectslug=JavaScript%2FGuide%2FRegular_Expressions

      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    };
    
    var nameSuffixRegExpEscaped = escapeRegExp(options.nameSuffix);
    
    firstCharList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    OtherCharsList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

    filesForCompress = this.filesSrc.filter(function(filepath) {
      var pattern = new RegExp(options.compressFilePrefix + '\\.\\S+$');
      return filepath.match(pattern) === null ? true : false;
    });

    filesForCompress.forEach(function(filepath) {
      var fileExtension;
      fileExtension = filepath.match(/\.(\S+$)/);
      fileExtension = fileExtension === null ? '' : fileExtension[1];
      if (fileExtension === 'css') {
        cssFiles.push(filepath);
      }
    });

    cssFiles.forEach(function(filepath) {
      var fileData;
      fileData = grunt.file.read(filepath);
      compressCssNames(fileData);
    });

    compressNonCssFileNames();
    filesForCompress.forEach(function(filepath) {
      var newFileData = compressFile(filepath);
      saveCompressedFile(newFileData, filepath);
    });



    function compressCssNames (fileData) {
      var
        namePattern,
        result;
      namePattern = new RegExp('(\\.|#)[A-Za-z0-9_-]+' + options.nameSuffix, 'g');
      result = fileData.match(namePattern);
      if (result === null) { return; }
      result.forEach(function (name) {
        name = name.substring(1, name.length);
        if (compressedNames[name] === undefined) {
          compressedNames[name] = getRandomStr();
        }
      });
    }

    function compressNonCssFileNames () {
      options.nonCssFileSelectors.forEach(function (selector) {
        // Remove first character if it is an dot or #.
        selector = selector.replace(/^[\.#]/, '');
        
        // Add string suffix if it does not has yet.
        var regExp = new RegExp(nameSuffixRegExpEscaped + '$');
        if (!selector.match(regExp)) {
          selector += options.nameSuffix;
        }
        
        if (compressedNames[selector] === undefined) {
          compressedNames[selector] = getRandomStr();
        }
      });
    }

    function compressFile (filepath) {
      var
        fileData,
        newFileData,
        namePattern;

      fileData = grunt.file.read(filepath);
      namePattern = new RegExp('[A-Za-z0-9_-]+' + options.nameSuffix, 'g');
      newFileData = fileData.replace(namePattern, function (name) {
        if (options.reportNotMinifiedSelectors && !compressedNames[name] && !notFound[name]) {
          notFound[name] = true;
          console.log("Selector not minified: " + name);
        }
        return compressedNames[name] ? compressedNames[name] : name;
      });
      return newFileData;
    }

    function getRandomStr(longString) {
      var
        compressedName;
      compressedName =
        firstCharList.charAt(Math.floor(Math.random()*firstCharList.length)) +
        OtherCharsList.charAt(Math.floor(Math.random()*OtherCharsList.length));
      if (namesLegth > 2500 || longString === true) {
        compressedName += OtherCharsList.charAt(Math.floor(Math.random()*OtherCharsList.length));
      }
      if (zipNames[compressedName] === 1) { // if collision
        return getRandomStr();
      } else {
        zipNames[compressedName] = 1;
        namesLegth++;
        return compressedName;
      }
    }

    function saveCompressedFile (newFileData, oldFilepath) {
      var
        newFilepath,
        newFileName,
        fileName,
        fileDir;

      fileName = oldFilepath.match(/\w+\.\S+$/)[0];
      fileDir = oldFilepath.substring(0, oldFilepath.length - fileName.length);
      newFileName = fileName.replace(/\.\S+$/, function (name) {
        return options.compressFilePrefix + name;
      });
      if (destDir !== null ) {
        if (options.flatten === true) { fileDir = ''; }
        newFilepath = destDir + fileDir + newFileName;
      } else {
        newFilepath = fileDir + newFileName;
      }
      grunt.file.write(newFilepath, newFileData);
      grunt.log.writeln('File "' + newFilepath + '" created.');
    }

  });

};
