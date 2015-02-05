/*
 * grunt-revizor
 * https://github.com/atrolov/grunt-revizor
 *
 * Copyright (c) 2015 Artem Frolov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    revizor: {
      options: {
        namePrefix: '--',
        compressFilePrefix: '-rvz',
        flatten: false
      },
      all: {
        src: ['test/css/*.css', 'test/html/*.html', 'test/js/*.js'],
        dest: 'tmp/'
      }
    },

  });


  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'revizor']);
};
