module.exports = function(grunt) {

	"use strict";

	// Project configuration
	var config = {

		clean: {
			pub: [
				"public/*",
				"!public/.gitignore"
			],
			temp: [
				"public/_main.html"
			]
		},

		copy: {
			javascript: {
				files: [
					{
						expand: true,
						flatten: true,
						src: "resources/js/*.min.js",
						dest: "public/js/"
					}
				]
			}
		},

		jade: {
			main: {
				options: {
					debug: false
				},
				files: {
					"public/_main.html": "resources/jade/main.jade"
				}
			}
		},

		jasmine: {
			all: {
				src: 'public/js/**/*.js',
				options: {
					specs: 'resources/tests/specs/**/*.js'
				}
			}
		},

		notify: {
			build: {
				options: {
					title: 'Build complete',
					message: 'All resources compiled successfully.'
				}
			},
			tests: {
				options: {
					title: 'Tests complete',
					message: 'All tests completed without failure.'
				}
			}
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'}),
					require('cssnano')()
				]
			},
			main: {
				src: [
					'public/css/*.css'
				]
			}
		},

		sass: {
			options: {
				sourceMap: false
			},
			main: {
				expand: true,
				cwd: 'resources/scss/',
				src: ['*.scss'],
				dest: 'public/css',
				ext: '.css'
			}
		},

		uglify: {
			main: {
				files: {
					'public/js/main.min.js': ['resources/js/main.js']
				}
			}
		},

		watch: {
			resources: {
				files: ['resources/**/*'],
				tasks: ['build'],
				options: {
					spawn: false,
				},
			}
		}

	};

	// Init
	require('time-grunt')(grunt);
	grunt.initConfig(config);

	require('load-grunt-tasks')(grunt);

	grunt.registerTask("default", ["build", "watch:resources"]);

	grunt.registerTask("build", [
		"clean:pub",
		"jade",
		"markdown",
		"sass:main",
		"postcss:main",
		"uglify:main",
		"copy:javascript",
		"clean:temp",
		"notify:build"
	]);

	grunt.registerTask("markdown", "Convert markdown to HTML", function() {
		var marky = require("marky-markdown"),
			mdOptions = {
				highlightSyntax: true
			},
			done = this.async(),
			fs = require("fs"),
			walk = require("walk"),
			walker,
			mdPath = "resources/markdown/",
			htmlPath = "public/";
		fs.readFile("public/_main.html", "utf8", function(err, mainData) {
			if (err) {
				mainData = '<!-- content -->';
			}
			walker = walk.walk(mdPath);
			walker.on("file", function(root, fileStats, next) {
				fs.readFile(mdPath + fileStats.name, "utf8", function(err, data) {
					var mdHTML = marky(data, mdOptions).html(),
						htmlContent = mainData.replace(/<!-- ?content ?-->/i, mdHTML),
						target = htmlPath + fileStats.name.replace(".md", ".html");
					fs.writeFileSync(target, htmlContent);
					(next)();
				});
			});
			walker.on("end", done);
		});
	});

	grunt.registerTask("test", [
		"build",
		"jasmine:all",
		"notify:tests"
	]);

};
