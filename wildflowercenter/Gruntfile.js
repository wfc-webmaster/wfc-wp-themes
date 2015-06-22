module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Set up SASS tasks

		sass: {

			dev: {

				options: {
					style: 'expanded',
					sourcemap: 'none',
				},

				files: {
					'compiled/style-expanded.css' : 'sass/style.scss'
				}

			},

			dist: {

				options: {
					style: 'compressed',
					sourcemap: 'none',
				},

				files: {
					'compiled/style.css' : 'sass/style.scss'
				}

			}
			
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			// Prefix all files
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'compiled/*.css',
				dest: ''
			}
		},

		// Set up files-to-watch task

		watch: {

			css: {
				files: '**/*.scss',
				tasks: ['sass','autoprefixer']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.registerTask('default', ['watch']);

}