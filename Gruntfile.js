var pngquant = require('imagemin-pngquant');
var mozjpeg = require('imagemin-mozjpeg');
var gifsicle = require('imagemin-gifsicle');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // watch changes and run tasks when made
    watch: {
      css: {
        files: ['src/**.scss'],
        tasks: ['css']
      },
      puliccss: {
        files: ['publicsrc/**.scss'],
        tasks: ['publiccss']
      },
      img: {
        files: ['src/img/**'],
        tasks: ['img']
      },
      config: {
        files: ['Gruntfile.js'],
        tasks: ['default']
      }
    },

    // compile scss from main.scss into dist/assets/app.css 
    sass: {
      options: {
        sourcemap: 'none',
        style: 'expanded'
      },
      app: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**.scss'],
          dest: 'src/',
          ext: '.css'
        }]
      },
      public: {
        files: [{
          expand: true,
          cwd: 'publicsrc/',
          src: ['**.scss'],
          dest: 'public/',
          ext: '.css'
        }]
      }
    },

    // adds vendor prefixes if required (based on conditions) and minifies dist/assets/app.css
    postcss: {
      options: {
        map: false
      },
      app: {
        options: {
          processors: [
            require('postcss-normalize')(), // produce normalize based on browserlist
            require('autoprefixer')(), // add vendor prefixes
          ]
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**.css'],
          dest: 'src/'
        }]
      },
      public: {
        options: {
          processors: [
            require('postcss-normalize')(), // produce normalize based on browserlist
            require('autoprefixer')(), // add vendor prefixes
          ]
        },
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['**.css'],
          dest: 'public/'
        }]
      }
    },

    // optimises png, jpg, gif files in dist/images
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          use: [pngquant(), mozjpeg(), gifsicle()]
        },
        files: [{
          expand: true,
          cwd: 'src/img/src/',
          src: ['**.{png,jpg,jpeg,gif}'],
          dest: 'src/img/'
        }]
      }
    }
  });

  // load modules
  grunt.loadNpmTasks('grunt-contrib-watch');;

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // register tasks
  grunt.registerTask('css', ['sass:app', 'postcss:app']);
  grunt.registerTask('publiccss', ['sass:public', 'postcss:public']);
  grunt.registerTask('img', 'imagemin');
  grunt.registerTask('default', ['css', 'publiccss', 'img'])

};
