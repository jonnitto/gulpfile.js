'use strict';
const func = require('../functions');

let task = {
	noop: callback => {
		callback();
	},
	timeout: callback => {
		setTimeout(() => {
			callback();
		}, 10);
	}
};


for (let taskName of ['clean', 'css', 'js', 'jsLint', 'scssLint', 'fonts', 'images', 'optimizeImages', 'static', 'svgSprite']) {
	let func = require('./' + taskName);
	if (typeof func !== 'function') {
		func = task.noop;
	}
	task[taskName] = func;
}

for (let taskWithTimeout of ['scss']) {
	let func = require('./' + taskWithTimeout);
	if (typeof func !== 'function') {
		task[taskWithTimeout] = task.noop;
	} else {
		task[taskWithTimeout] = bach.series(func, task.timeout);
	}
}

task.info = (callback) => {
	let table = textTable([
		['  Project', ':', config.info.description],
		['  System', ':', config.info.system],
		['  Author', ':', config.info.author],
		['  Homepage', ':', config.info.homepage]
	], { align: ['r', 'c', 'l' ] });
	console.log('\n\n' +util.colors.dim(table) + '\n\n');
	callback();
}

if (config.tasks.css) {
	gulp.task('css', bach.series(task.scss, task.css));
	gulp.task('css').description = 'Render CSS Files';
	gulp.task('css').flags = flags;

	gulp.task('scss', task.scss)
	gulp.task('scss').description = 'Render _all.scss and _allsub.scss Files';

	if (config.tasks.scssLint) {
		gulp.task('scssLint', task.scssLint);
		gulp.task('scssLint').description = 'Lint CSS Files';
	}
}

if (config.tasks.js) {
	gulp.task('js', bach.parallel(task.js, task.jsLint));
	gulp.task('js').description = 'Render Javascript Files';
	gulp.task('js').flags = flags;

	if (config.tasks.jsLint) {
		gulp.task('jsLint', task.jsLint);
		gulp.task('jsLint').description = 'Lint Javascript files';
	}
}

gulp.task('optimizeImages', task.optimizeImages);
gulp.task('optimizeImages').description = 'Optimize images and overrite them in the public folder';

if (config.tasks.svgSprite) {
	gulp.task('sprite', task.svgSprite);
	gulp.task('sprite').description = 'Create SVG Sprite';
}


// Build Task
gulp.task('build', bach.series(
	task.clean,
	task.info,
	bach.parallel(
		task.scss,
		task.scssLint,
		task.jsLint,
		task.fonts,
		task.images,
		task.static,
		task.svgSprite
	),
	bach.parallel(
		task.css,
		task.js
	)
));
gulp.task('build').description = util.colors.inverse(' Generates all ') + ' Assets, Javascript and CSS files';
gulp.task('build').flags = flags;

// Watch
task.watch = () => {
	const TASK = ['css', 'js', 'fonts', 'images', 'static', 'svgSprite'];

	if (browserSync) {
		browserSync.init(config.browserSync);
	}

	TASK.forEach((taskName) => {
		if (config.tasks[taskName]) {
			let filesToWatch = func.getFilesToWatch(taskName);
			switch (taskName) {
				case 'css':
					gulp.watch(filesToWatch, bach.parallel(task.css, task.scssLint)).on('change', cache.update(taskName));
					break;
				case 'js':
					gulp.watch(filesToWatch, bach.parallel(task.js, task.jsLint)).on('change', cache.update(taskName));
					break;
				default:
					gulp.watch(filesToWatch, task[taskName]).on('change', cache.update(taskName));
			}
		}
	});
	console.log(util.colors.dim('\n\n   Watching source files for changes\n\n'));
};


gulp.task('watch', task.watch);
gulp.task('watch').description = 'Watch files and regenereate them'

// Default Task
gulp.task('default', gulp.series('build', 'watch'));
gulp.task('default').description = util.colors.inverse(' Generates all ') + ' Assets, Javascript and CSS files & ' + util.colors.inverse(' watch them ');
gulp.task('default').flags = flags;


gulp.task('pipeline', gulp.series('build', 'optimizeImages'))
gulp.task('pipeline').description = 'Build task for pipeline'
