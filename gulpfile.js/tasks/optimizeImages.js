'use strict';
let paths = {
	src: path.join(config.root.base, config.root.src, config.tasks.images.src, '/**', getExtensions(config.tasks.images.extensions)),
	dest: path.join(config.root.base, config.root.src, config.tasks.images.src)
};

function optimizeImages() {
	return gulp.src(paths.src)
		.pipe(plumber(handleErrors))
		.pipe(imagemin([
			imagemin.gifsicle(),
			imagemin.jpegtran(),
			imagemin.optipng(),
			imagemin.svgo()
		],{
			verbose: true
		}))
		.pipe(chmod(config.chmod))
		.pipe(size({
			title: 'Images:',
			showFiles: false
		})
	);
}

module.exports = optimizeImages;
