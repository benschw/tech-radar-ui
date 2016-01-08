/*jshint camelcase:false */
// Generated on 2016-01-06 using generator-closure 0.1.15
//
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  //
  //
  // Config basic parameters
  //
  //
  //
  var CONF = {
    // the base file of your project. The full path will result by concatenating
    // appPath + bootstrapFile
    bootstrapFile: 'main.js',

    // The folder that contains all the externs files.
    externs: [
		'closure/closure-compiler/contrib/externs/angular-1.4.js',
		'closure/closure-compiler/contrib/externs/angular-ui-router.js'
	],

    // define the main namespace of your app.
    entryPoint: 'demo.app',

    // The path to the closure library
    closureLibrary: process.env.CLOSURE_PATH || 'closure/closure-library',
    closureCompiler: process.env.CLOSURE_COMPILER || 'closure/compiler.jar',
    closureLinter: 'app/closure-linter/closure_linter',

    // The path to the installed bower components
    componentPath: 'bower_components',

    // the compiled file
    destCompiled: 'dist/app.js',

    // define the path to the app
    appPath: 'app/js/',

    // The location of the source map
    sourceMap: 'build/sourcemap.js.map',

    // This sting will wrap your code marked as %output%
    // Take care to edit the sourcemap path
    outputWrapper: '(function(){ %output% }).call(window)',
  };

  // the file globbing pattern for vendor file uglification.
  CONF.vendorFiles = [
      CONF.componentPath + '/angular/angular.js',
      CONF.componentPath + '/angular-route/angular-route.js',
      CONF.componentPath + '/angular-ui-router/release/angular-ui-router.js',

      // and do not include jQuery, we'll use a CDN for it.
      '!' + CONF.appPath + '/vendor/jQuery*'
    ];



  //
  //
  // Start Gruntconfig
  //
  //
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
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
            CONF.closureLibrary,
            CONF.componentPath,
          ],
        },
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>/test/'
      }
    },



    //
    //
    //
    // Closure Tools Tasks
    //
    // Dependency & Compiling
    //
    //
    //
    closureDepsWriter: {
      options: {
        closureLibraryPath: CONF.closureLibrary
      },
      app: {
        options: {
          root_with_prefix: [
            '"' + CONF.appPath + ' ../../../js"',
            '"' + CONF.componentPath + ' ../../../components"'
          ]
        },
        dest: '' + CONF.appPath + '/deps.js'
      },
    },
    closureBuilder: {
      options: {
        closureLibraryPath: CONF.closureLibrary,
        inputs: [CONF.appPath + CONF.bootstrapFile],
        compile: true,
        compilerFile: CONF.closureCompiler,
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          //compilation_level: 'SIMPLE_OPTIMIZATIONS',
          externs: [
            'closure/closure-compiler/contrib/externs/angular-1.4*.js',
            'closure/closure-compiler/contrib/externs/angular_ui_router.js'
          ],
          //externs: CONF.externs,
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
          CONF.componentPath
        ],
        dest: 'build/compiled.js'
      },
      debug: {
        options: {
          compilerFile: CONF.closureCompiler
        },
        src: [
          CONF.appPath,
          CONF.closureLibrary,
          CONF.componentPath
        ],
        dest: 'build/compiled.debug.js'
      }
    },

    // Linting tasks.
    closureLint: {
      app:{
        closureLinterPath : CONF.closureLinter,
        src: [
          'app/js/**'
        ],
        options: {
          stdout: true,
          strict: true
        }
      }
    },
    closureFixStyle: {
      app:{
        closureLinterPath : CONF.closureLinter,
        src: [
          'app/js/**'
        ],
        options: {
          stdout: true,
          strict: true
        }
      }
    },

    // clean, uglify and concat aid in building
    clean: {
      build: ['build'],
      dist: ['dist'],
      server: ['build']
    },
    uglify: {
      vendor: {
        files: {
          'build/vendor.js': CONF.vendorFiles
        }
      }
    },
    concat: {
      scripts: {
        src: ['build/vendor.js', 'build/compiled.js'],
        dest: 'build/app.js',
      },
      debug: {
        src: [
          CONF.componentPath + '/angular/angular.js',
          CONF.componentPath + '/angular-route/angular-route.js',
          CONF.componentPath + '/angular-ui-router/release/angular-ui-router.js',
          'build/compiled.js',
          'src-map-tail.js'
        ],
        dest: 'build/app.js',
      }
    },
    copy: {
      dist: {
        files: [{
          src: 'build/app.js',
          dest: 'dist/app.js',
        },{
          src: 'index.html',
          dest: 'dist/index.html',
        },{
          expand: true, cwd: 'app/', src: ['views/**'], dest: 'dist/'
        }]
      },
      distdebug: {
        files: [{
          src: 'build/source-map.js.map',
          dest: 'dist/source-map.js.map',
        }],
      },
    },


    //
    //
    //
    // Optional boilerplate tasks
    //
    //
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'app/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          'app/styles/main.css': [
            'build/styles/{,*/}*.css',
            'app/styles/{,*/}*.css'
          ]
        }
      }
    },

  }); // end grunt.initConfig();



  //
  //
  // initConfig END
  //
  // Register tasks
  //
  //
  grunt.registerTask('server', function (target) {
  /*
    if (target === 'test') {
      return grunt.task.run([
        'clean:server',
        'connect:test',
        'open:test',
        'watch:test'
      ]);
    }
*/
    grunt.task.run([
      'clean:server',
      'connect:app',
//      'open:server',
      'watch:livereload'
    ]);
  });
  grunt.registerTask('test', [
/*
    'clean:server',
    'connect:test',
    'mocha'
*/
  ]);
  grunt.registerTask('build', [
    'clean:build',
    'clean:dist',
    'uglify:vendor',
    'closureBuilder:app',
    'concat:scripts',
  ]);

  grunt.registerTask('dist-debug', [
    'build',
    'concat:debug',
	'copy:dist',
	'copy:distdebug',
  ]);
  grunt.registerTask('dist', [
    'build',
	'copy:dist',
  ]);
  
  grunt.registerTask('deps', [
    'closureDepsWriter:app',
  ]);

  grunt.registerTask('default', [
	'test',
    'build'
  ]);

  grunt.registerTask('lint', [
    'closureLint:app'
  ]);

  grunt.registerTask('fixstyle', [
    'closureFixStyle:app'
  ]);
};
