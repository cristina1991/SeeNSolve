/// <binding />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'bower-install-simple': {
            production: true
        },
        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['jshint', 'jscs', 'concat'],
                options: {
                    interrupt: false
                }
            }
        },
        concat: {
            dist: {
                files: {
                    'build/seeNSolve.js': [
                        'app/app.module.js',
                        'app/**/*.js'
                    ]
                }
            }
        },
        jshint: {
            all: ['app/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        jscs: {
            src: 'app/**/*.js',
            options: {
                config: '.jscsrc',
                fix: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-install-simple');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');

    // Default task(s).
    grunt.registerTask('default', ['bower-install-simple', 'watch']);

};