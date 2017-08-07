var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var htmlmin = require('gulp-htmlmin');
var sass = require("gulp-sass");


// default task
gulp.task("default", ["html", "sass"], function() {

    // launch develop local server
    browserSync.init({
        server: "dist/"
    });

    // watch html files to reload browser
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);

    // watch styles folder to compile sass files
    gulp.watch(["src/styles/*.scss", "src/styles/**/*.scss"], ["sass"]);
});


// compile html files
gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

// compile css styles from sass files
gulp.task("sass", function(){
    gulp.src("src/styles/styles.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream()); // reload CSS in open browsers
});
