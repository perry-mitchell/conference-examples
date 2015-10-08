var gulp = require('gulp'),
	jade = require('gulp-jade'),
	uglify = require('gulp-uglify'),
	exec = require('child_process').exec,
	del = require('del'),
	runSequence = require('run-sequence');

gulp.task('default', ['compress', 'templates']);

gulp.task('clean', function() {
	return del([
		'public/**/*',
		'!public/.gitignore'
	]);
});

gulp.task('compress', ['compress-client', 'compress-main']);

gulp.task("compress-client", function() {
	return gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/windows/js/'));
});

gulp.task('compress-main', function() {
	return gulp.src('source/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/'));
});

gulp.task('electron', function (cb) {
	var e = exec('electron ' + __dirname, function (err, stdout, stderr) {
		cb(err);
	});
	e.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});
});

gulp.task('start', function(cb) {
	runSequence('clean', 'compress', 'templates', 'electron', cb);
});
 
gulp.task('templates', function() {
	gulp.src('jade/*.jade')
		.pipe(jade({
			locals: {}
		}))
		.pipe(gulp.dest('public/windows/'))
});