'use strict';
/*jshint camelcase:false */

/*
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
*/
module.exports = function (grunt) {

  //
  // Config
  //
  var CONF = {
    // define the path to the app
    appPath: 'app/js/',

    buildPath: 'build',
    tmpPath: 'tmp',

    // Entry point file within `appPath`
    bootstrapFile: 'main.js',

    // Entry point namespace
    entryPoint: 'demo',

    // The path to the installed bower components
    componentPath: 'bower_components',

    // closure
    closureCompiler: 'node_modules/google-closure-compiler/compiler.jar',
    closureLibrary: process.env.CLOSURE_PATH || 'closure/closure-library',
    externs: [
      'closure/closure-compiler/contrib/externs/showdown-1.3.js',
      'closure/closure-compiler/contrib/externs/angular-1.4*.js',
      'closure/closure-compiler/contrib/externs/angular_ui_router.js',
      'closure/closure-compiler/contrib/externs/ui-bootstrap.js',
      'closure/closure-compiler/contrib/externs/google_visualization_api.js'
    ],


    // This sting will wrap your code marked as %output%
    outputWrapper: '(function(){%output%}).call(window)',

    // the compiled file
    destCompiled: 'dist/app.js',


  };

  // the file globbing pattern for vendor file uglification.
  CONF.vendorFiles = [
      CONF.componentPath + '/angular/angular.js',
      CONF.componentPath + '/angular-route/angular-route.js',
      CONF.componentPath + '/angular-ui-router/release/angular-ui-router.js',
      CONF.componentPath + '/angular-bootstrap/ui-bootstrap.js',
      CONF.componentPath + '/angular-bootstrap/ui-bootstrap-tpls.js',

      // and do not include jQuery, we'll use a CDN for it.
      '!' + CONF.appPath + '/vendor/jQuery*'
    ];



  //
  // Gruntconfig
  //
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          CONF.appPath
        ]
      },
    },

    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: [
          CONF.appPath + '/**/*.js'
        ],
      },
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        keepalive: false,
      },
      app: {
        options: {
          base: [
            'app',
            'app/js',
            CONF.closureLibrary,
            CONF.componentPath,
            CONF.tmpPath,
          ],
        },
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },


    // Closure
    closureDepsWriter: {
      options: {
        closureLibraryPath: CONF.closureLibrary
      },
      app: {
        options: {
          root_with_prefix: [
            '"' + CONF.appPath + ' ../../../js"',
          ]
        },
        dest: '' + CONF.tmpPath + '/deps.js'
      },
    },
    closureBuilder: {
      options: {
        closureLibraryPath: CONF.closureLibrary,
        inputs: [CONF.appPath + CONF.bootstrapFile],
        compile: true,
        compilerFile: CONF.closureCompiler,
        compilerOpts: {
          language_in: 'ECMASCRIPT5_STRICT',
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          //compilation_level: 'SIMPLE_OPTIMIZATIONS',
          externs: CONF.externs,
          define: [
            '\'goog.DEBUG=true\''
          ],
          warning_level: 'VERBOSE',
          jscomp_error: ['checkTypes', 'accessControls'],
          //jscomp_warning: ['accessControls'],
          jscomp_off: ['externsValidation'],
          summary_detail_level: 3,
          angular_pass: null,
          generate_exports: null,
          export_local_property_definitions: null,
          only_closure_dependencies: null,
          closure_entry_point: CONF.entryPoint,
          source_map_format: 'V3',
          create_source_map: 'build/source-map.js.map',
          //formatting: 'PRETTY_PRINT',
          //debug: null,
          output_wrapper: CONF.outputWrapper

        }
      },
      app: {
        src: [
          CONF.appPath,
          CONF.closureLibrary,
          CONF.buildPath + "/tpl"

        ],
        dest: 'build/app.js'
      }
    },

    // cache templates
    ngtemplates:  {
      app:        {
        cwd:      CONF.appPath,
        src:      '**/**.html',
        dest:     'build/tpl/app.templates.js',
        options: {
          module: 'cache.tpl',
          bootstrap: function(module, script) {
            return "goog.provide('"+module+"');\n" +
                   "/**\n"+
                   " * @param  {angular.$templateCache=} $templateCache\n"+
                   " * @ngInject\n"+
                   " */\n"+
                   "var populateTpls = function($templateCache) {" + script+"};\n\n" +
                   "/**\n"+
                   " * @type {angular.Module}\n"+
                   " */\n" +
                   module+" = angular.module('"+module+"', []).run(populateTpls);\n\n";
          }
        }
      }
    },

    useminPrepare: {
      html: 'build/index.html',
      options: {
        root: ['./bower_components', './app'],
        dest: 'build',
        assetsDirs: ['bower_components']
      }
    },
    usemin: {
      html: 'build/index.html',
      options: {
        blockReplacements: {
          squash: function () {
              return '<script src="/app.js"></script>';
          }
        },
        assetsDirs: ['bower_components']
      }
    },

    // clean, uglify and concat aid in building
    clean: {
      build: ['build'],
      dist: ['dist'],
    },
    concat: {
      jsdebug: {
        src: 'build/app.js',
        dest: 'build/app.debug.js',
        options: {
          footer: '//# sourceMappingURL=/source-map.js.map',
        }
      }
    },
    copy: {
      html: {
        files: [{
          src: 'app/index.html',
          dest: 'build/index.html',
        }]
      },
      htmldist: {
        files: [{
          src: 'build/index.html',
          dest: 'dist/index.html',
        }]
      },
      js: {
        files: [{
          src: 'build/app.js',
          dest: 'dist/app.js',
        },{
          src: 'build/vendor.js',
          dest: 'dist/vendor.js',
        }]
      },
      css: {
        files: [{
          src: 'build/style.css',
          dest: 'dist/style.css',
        }]
      },
      jsdebug: {
        files: [{
          src: 'build/source-map.js.map',
          dest: 'dist/source-map.js.map'
        },{
          src: 'build/app.debug.js',
          dest: 'dist/app.js',
        },{
          src: 'build/vendor.js',
          dest: 'dist/vendor.js',
        }]
      }
    },


  });



  // Register tasks

  grunt.registerTask('server', function () {
    grunt.task.run([
      'connect:app',
      'watch:livereload'
    ]);
  });

  grunt.registerTask('build-common', [
    'jshint:all',
    'clean:build',
    'clean:dist',
    'ngtemplates',
    'closureBuilder:app',

    'copy:html',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin',
	'cssmin',
    'copy:htmldist'
  ]);

  grunt.registerTask('build-debug', [
    'build-common',
    'concat:jsdebug',
	'copy:jsdebug',
  ]);

  grunt.registerTask('build', [
    'build-common',
	'copy:js',
	'copy:css',
  ]);

  grunt.registerTask('deps', [
    'closureDepsWriter:app',
  ]);

  grunt.registerTask('default', [
	'test',
    'build'
  ]);

  grunt.registerTask('fixstyle', [
    'closureFixStyle:app'
  ]);
};
