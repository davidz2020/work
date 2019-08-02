var gulp = require('gulp');
var postcss = require('gulp-postcss');
var shortColor = require('postcss-short-color');
var autoprefixer = require('autoprefixer');
var cssnext = require('postcss-preset-env');
var shortcss = require('postcss-short');
// var cssnano = require('cssnano');
var postcssNesting = require("postcss-nesting");
const apply = require('postcss-apply');
const postcssCustomProperties = require('postcss-custom-properties');
const center = require('postcss-center');
const postcssColorMod = require('postcss-color-mod-function');

var paths = {

	src: {
		src: ['./src/*.html', './src/**/**/*', '!src/res/css/*'],
		dest: './dist/'
	},
	html: {
		src: './src/*.html',
		dest: './dist/'
	},
	styles: {
		src: ['./src/res/**/*.css', '!src/**/layui', '!src/**/layui/**'],
		dest: './dist/res'
	},
	scripts: {
		src: './src/res/**/*.js',
		dest: './dist/res'
	},
	images: {
		src: ['./src/res/**/*.png', './src/res/**/*.gif', './src/res/**/*.jpg'],
		dest: './dist/res'
	},
	font: {
		src: ['./src/res/**/*.eot', './src/res/**/*.ttf', './src/res/**/*.woff', './src/res/**/*.woff2', './src/res/**/*.svg'],
		dest: './dist/res'
	}
};
var plugins = [
	autoprefixer({ browsers: ['> 1%'], cascade: false }),
	shortcss,
	postcssCustomProperties,
	postcssColorMod,
	center,
	apply,
	shortColor,
	cssnext,
	postcssNesting,
	// cssnano,
];
// var condition = function(f){
//     if(f.path.endswith('.min.js')){
//         return false;
//     }
//     return true;
// };

function src() {
	return gulp.src(paths.src.src)
		.pipe(gulp.dest(paths.src.dest));

}
function html() {
	return gulp.src(paths.html.src)
		.pipe(gulp.dest(paths.html.dest));

}
function styles() {
	return gulp.src(paths.styles.src)
		.pipe(postcss(plugins))
		.pipe(gulp.dest(paths.styles.dest));

}
function scripts() {
	return gulp.src(paths.scripts.src)
		.pipe(gulp.dest(paths.scripts.dest))
}
function images() {
	return gulp.src(paths.images.src)
		.pipe(gulp.dest(paths.images.dest));
}

function font() {
	return gulp.src(paths.font.src)
		.pipe(gulp.dest(paths.font.dest));
}

function watch() {
	gulp.watch(paths.src.src, src);
	gulp.watch(paths.styles.src, styles);
	// gulp.watch(paths.scripts.src, scripts);
	// gulp.watch(paths.images.src, images);
}


// const build = gulp.series(html, styles, scripts, images, font, watch);
const build = gulp.series(src, styles, watch);

gulp.task('default', build);
