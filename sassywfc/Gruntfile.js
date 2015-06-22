module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// SASS task
		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
				},
				files: {
					'compiled/style-readable.css': 'sass/style.scss',
					'layouts/content-sidebar.css': 'sass/layout-content-sidebar.scss',
					'layouts/flex.css': 'sass/layout-flex.scss',
					'layouts/sidebar-content.css': 'sass/layout-sidebar-content.scss'
				}
			},

			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
				},
				files: {
					'compiled/style.css': 'sass/style.scss'
				}
			}

		},

		// Autoprefixer
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			// prefix all files
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'compiled/*.css',
				dest: ''
			}
		},

		// Watch task
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