'use strict'

var path = require('path')

module.exports = function (grunt) {
  var paths = {
    app: path.join(path.resolve(), '/src/app'),
    test: path.join(path.resolve(), '/public/test/*.js'),
    dist: path.join(path.resolve(), '/public'),
    config: path.join(path.resolve(), '/config')
  }

  var clean = {
    src: '<%= paths.dist %>'
  }

  var ts = {
    options: {
      module: 'commonjs',
      target: 'ES6',
      rootDir: '<%= paths.app %>',
      inlineSourceMap: true
    },
    default: {
      src: ['<%= paths.app %>/**/*.ts', '!node_modules/**/*'],
      outDir: '<%= paths.dist %>/'
    },
    faster: {
      src: ['<%= paths.app %>/**/*.ts', '!node_modules/**/*'],
      outDir: '<%= paths.dist %>/',
      options: {
        fast: 'faster'
      }
    }
  }

  var copy = {
    json: {
      expand: true,
      cwd: path.join('<%= paths.config %>', '/'),
      src: '**/*.json',
      dest: path.join('<%= paths.dist %>', '/config', '/')
    }
  }

  var mocha = {
    test: {
      options: {
        reporter: 'spec',
        captureFile: 'results.txt',
        quiet: false,
        clearRequireCache: false,
        noFail: false
      },
      src: ['<%= paths.test %>']
    }
  }

  var watch = {
    ts: {
      files: [ '<%= paths.app %>/**/*.ts' ],
      tasks: ['copy', 'ts:faster', 'mochaTest']
    }
  }

  var nodemon = {
    default: {
      script: '<%= paths.dist %>/app.js',
      options: {
        cwd: path.resolve(),
        watch: ['<%= paths.dist %>'],
        ignore: ['node_modules']
      }
    }
  }

  var concurrent = {
    default: {
      tasks: ['watch', 'nodemon'],
      options: {
        logConcurrentOutput: true
      }
    }
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: paths,
    copy: copy,
    mochaTest: mocha,
    ts: ts,
    clean: clean,
    watch: watch,
    nodemon: nodemon,
    concurrent: concurrent
  })

  require('load-grunt-tasks')(grunt)

  grunt.registerTask('compile', ['clean', 'copy', 'ts:default'])
  grunt.registerTask('test', ['compile', 'mochaTest'])
  grunt.registerTask('dev', ['test', 'concurrent'])
  grunt.registerTask('default', ['compile', 'concurrent'])
}
