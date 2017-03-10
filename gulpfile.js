'use strict';

var gulp = require('gulp'),
		theme = "ventureday",
		browserSync = require('browser-sync'),
		autoprefixer = require('gulp-autoprefixer'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		concat = require('gulp-concat'),
		sass = require('gulp-sass'),
		watch = require('gulp-watch'),
		rimraf = require('rimraf'),
		rigger = require('gulp-rigger'),
		coffee = require('gulp-coffee'),
		reload = browserSync.reload;

var path = {
		build: {
				php: 'build/wp-content/themes/' + theme +'/',
				html: 'build/wp-content/themes/' + theme +'/',
				js: 'build/wp-content/themes/' + theme +'/assets/js/',
				css: 'build/wp-content/themes/' + theme +'/assets/css/',
				img: 'build/wp-content/themes/' + theme +'/assets/images/',
				fonts: 'build/wp-content/themes/' + theme +'/assets/fonts/',
				coffee: 'src/wp-content/themes/' + theme +'/assets/src/js/coffee/',
				includes: 'build/wp-content/themes/' + theme +'/assets/includes/',
		},
		src: {
				html: 'src/wp-content/themes/' + theme +'/**/*.html',
				php: 'src/wp-content/themes/' + theme +'/**/*.php',
				js: 'src/wp-content/themes/' + theme +'/assets/src/js/**/*.js',
				coffeeJs: 'src/wp-content/themes/' + theme +'/assets/src/js/coffee/*.js',
				libjs: 'src/wp-content/themes/' + theme +'/assets/src/jsLibs/**/*.js',
				coffee: 'src/wp-content/themes/' + theme +'/assets/src/coffee/*.coffee',
				scss: 'src/wp-content/themes/' + theme +'/assets/src/scss/main.scss',
				img: 'src/wp-content/themes/' + theme +'/assets/src/images/**/*.*',
				fonts: 'src/wp-content/themes/' + theme +'/assets/src/fonts/**/*.*',
				includes: 'src/wp-content/themes/' + theme +'/assets/src/includes/**/*.*',
		},
		watch: {
				html: 'src/wp-content/themes/' + theme +'/**/*.html',
				js: 'src/wp-content/themes/' + theme +'/assets/src/js/*.js',
				libjs: 'src/wp-content/themes/' + theme +'/assets/src/jsLibs/**/*.js',
				scss: 'src/wp-content/themes/' + theme +'/assets/src/**/*.scss',
				img: 'src/wp-content/themes/' + theme +'/assets/src/images/**/*.*',
				fonts: 'src/wp-content/themes/' + theme +'/assets/src/fonts/**/*.*',
				php: 'src/wp-content/themes/' + theme +'/**/*.php',
				includes: 'src/wp-content/themes/' + theme +'/assets/src/includes/**/*.*',
				coffee: 'src/wp-content/themes/' + theme +'/assets/src/coffee/*.coffee',
		},
		clean: './build/build/wp-content/themes/' + theme +'/'
};


var config = {
		proxy: 'vdm.dev',
		port: 9000,
};


gulp.task('webserver', function () {
		browserSync(config);
});

gulp.task('html:build', function(){
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('scss:build', function(){
	gulp.src(path.src.scss)
		.pipe(sass())
		.pipe(autoprefixer({cascade: true, indentation: "tabs"
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
		gulp.src(path.src.img)
			.pipe(imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()],
					interlaced: true
			}))
			.pipe(gulp.dest(path.build.img))
			.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
		gulp.src(path.src.fonts)
			.pipe(gulp.dest(path.build.fonts))
});


// JS Build
gulp.task('coffee:build', function(){
	gulp.src(path.src.coffee)
		.pipe(coffee().on('error', function(){
			console.log('###########################\r\n#####   coffee error   ####\r\n###########################');
		}))
		.pipe(gulp.dest(path.build.coffee));
});

gulp.task('js:build', ['coffee:build'] ,function() {
		setTimeout(function(){
			gulp.src([path.src.js, path.src.coffeeJs])
					.pipe(concat('main.js', {newLine: ';'}))
					.pipe(gulp.dest(path.build.js))
					.pipe(reload({stream: true}));
		},200);
});

gulp.task('libjs:build' ,function() {
		setTimeout(function(){
			gulp.src(path.src.libjs)
					.pipe(concat('libs.js'))
					.pipe(gulp.dest(path.build.js))
					.pipe(reload({stream: true}));
		},200);
});


// php build
gulp.task('php:build' ,function() {
		gulp.src(path.src.php)
				.pipe(gulp.dest(path.build.php))
				.pipe(reload({stream: true}));
});

// includes
gulp.task('includes:build', function() {
		gulp.src(path.src.includes)
				.pipe(gulp.dest(path.build.includes))
				.pipe(reload({stream: true}));
});


/**
		ALL Build
**/

gulp.task('build', [
		'includes:build',
		'php:build',
		'coffee:build',
		'js:build',
		'libjs:build',
		'scss:build',
		'fonts:build',
		'image:build',
]);

gulp.task('watch', function(){
		watch([path.watch.php], function(event, cb) {
				gulp.start('php:build');
		});
		watch([path.watch.scss], function(event, cb) {
				setTimeout(function()
					{
						gulp.start('scss:build');
					}, 200);
		});
		watch([path.watch.js], function(event, cb) {
					gulp.start('js:build');
		});
		watch([path.watch.img], function(event, cb) {
				gulp.start('image:build');
		});
		watch([path.watch.fonts], function(event, cb) {
				gulp.start('fonts:build');
		});
		watch([path.watch.includes], function(event, cb) {
				gulp.start('includes:build');
		});
		watch([path.watch.coffee], function(event, cb) {
				gulp.start('js:build');
		});
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);