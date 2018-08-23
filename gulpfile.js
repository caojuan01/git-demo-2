'use strict'
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/style/_*.less'])
	.pipe(less())   //将less文件编译成css文件
	.pipe(cssnano())  //压缩css
	.pipe(gulp.dest('dist/styles/'))
	.pipe(browserSync.reload({
		stream : true
	}));
}); 

gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))  //合并文件
	.pipe(uglify())   //压缩js文件
	.pipe(gulp.dest('dist/scripts/'))
	.pipe(browserSync.reload({
		stream : true
	}));
});

// 3. 图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images/'))
	.pipe(browserSync.reload({
		stream : true
	}));
});
 
// 4.html
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({
		stream : true
	}));
});

var browserSync = require('browser-sync');
gulp.task('serve', function(){
  browserSync({
    server:{
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

   gulp.watch('src/styles/*.less',['style']);
   gulp.watch('src/scripts/*.js',['script']);
   gulp.watch('src/images/*.*',['image']);
   gulp.watch('src/*.html',['html']);
});