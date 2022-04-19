const gulp = require("gulp");
const { series, parallel } = require("gulp");
const inject = require("gulp-inject");
const print = require("gulp-print").default;
const uglify = require("gulp-uglify");
const csso = require("gulp-csso");
const htmlmin = require("gulp-htmlmin");
var clean = require("gulp-clean");


gulp.task("clean", function () {
  return gulp.src("./.tmp", { read: false }).pipe(clean());
});

gulp.task("minify", () => {
  return gulp
    .src("./dist/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("minScripts", function () {
  return (
    gulp
      .src("./src/**/*.js")
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest("./.tmp/min/js"))
  );
});

gulp.task("minStyles", function () {
  return (
    gulp
      .src("./src/**/*.css")
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest("./.tmp/min/css"))
  );
});

gulp.task(
  "build-admin:prod",
  gulp.series("minScripts", "minStyles", function () {
    return (
      gulp
        .src("./src/admin.html")
        // inject javascript contents into index.html file
        .pipe(
          inject(gulp.src(["./.tmp/**/admin.js"]), {
            starttag: "<!-- inject:admin:js -->",
            transform: function (filePath, file) {
              // return file contents as string
              return "<script>" + file.contents.toString("utf8") + "</script>";
            }, // end transform
          })
        )
        .pipe(
          inject(gulp.src(["./.tmp/**/dexie.js"]), {
            starttag: "<!-- inject:dexie:js -->",
            transform: function (filePath, file) {
              // return file contents as string
              return "<script>" + file.contents.toString("utf8") + "</script>";
            }, // end transform
          })
        )
        
        // inject nav partials contents into index.html file
        .pipe(
          inject(gulp.src(["./src/partials/nav.html"]), {
            starttag: "<!-- inject:nav:html -->",
            transform: function (filePath, file) {
              // return file contents as string
              return file.contents.toString("utf8");
            }, // end transform
          })
        )
        // inject css contents into index.html file
        .pipe(
          inject(gulp.src(["./.tmp/**/admin.css"]), {
            starttag: "<!-- inject:admin:css -->",
            transform: function (filePath, file) {
              // return file contents as string
              return "<style>" + file.contents.toString("utf8") + "</style>";
            }, // end transform
          })
        )
        // minify html
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(
          print(function (file) {
            return "injecting " + file;
          })
        )

        .pipe(gulp.dest("./dist"))
    );
  })
);

gulp.task(
    "build-admin:dev",
    gulp.series( function () {
      return (
        gulp
          .src("./src/admin.html")
          // inject javascript contents into index.html file
          .pipe(
            inject(gulp.src(["./src/**/admin.js"]), {
              starttag: "<!-- inject:admin:js -->",
              transform: function (filePath, file) {
                // return file contents as string
                return "<script>" + file.contents.toString("utf8") + "</script>";
              }, // end transform
            })
          )
          .pipe(
            inject(gulp.src(["./src/**/dexie.js"]), {
              starttag: "<!-- inject:dexie:js -->",
              transform: function (filePath, file) {
                // return file contents as string
                return "<script>" + file.contents.toString("utf8") + "</script>";
              }, // end transform
            })
          )
          // inject nav partials contents into index.html file
          .pipe(
            inject(gulp.src(["./src/partials/nav.html"]), {
              starttag: "<!-- inject:nav:html -->",
              transform: function (filePath, file) {
                // return file contents as string
                return file.contents.toString("utf8");
              }, // end transform
            })
          )
          // inject css contents into index.html file
          .pipe(
            inject(gulp.src(["./src/**/admin.css"]), {
              starttag: "<!-- inject:admin:css -->",
              transform: function (filePath, file) {
                // return file contents as string
                return "<style>" + file.contents.toString("utf8") + "</style>";
              }, // end transform
            })
          )
          .pipe(
            print(function (file) {
              return "injecting " + file;
            })
          )
  
          .pipe(gulp.dest("./dist"))
      );
    })
  );

gulp.task(
  "build:prod",
  gulp.series("minScripts", "minStyles", function () {
    // inject partials contents into index.html file
    return (
      gulp
        .src("./src/*.html")
        // inject javascript contents into index.html file
        .pipe(
          inject(gulp.src(["./.tmp/**/*.js", "!./.tmp/**/admin.js"]), {
            starttag: "<!-- inject:js:js -->",
            transform: function (filePath, file) {
              // return file contents as string
              return "<script>" + file.contents.toString("utf8") + "</script>";
            }, // end transform
          })
        )
        // inject nav partials contents into index.html file
        .pipe(
          inject(gulp.src(["./src/partials/nav.html"]), {
            starttag: "<!-- inject:nav:html -->",
            transform: function (filePath, file) {
              // return file contents as string
              return file.contents.toString("utf8");
            }, // end transform
          })
        )
        // inject nav partials contents into index.html file
        .pipe(
          inject(gulp.src(["./src/partials/modal.html"]), {
            starttag: "<!-- inject:modal:html -->",
            transform: function (filePath, file) {
              // return file contents as string
              return file.contents.toString("utf8");
            }, // end transform
          })
        )

        // inject css contents into index.html file
        .pipe(
          inject(gulp.src(["./.tmp/**/*.css", "!./.tmp/**/admin.css"]), {
            starttag: "<!-- inject:css:css -->",
            transform: function (filePath, file) {
              // return file contents as string
              return "<style>" + file.contents.toString("utf8") + "</style>";
            }, // end transform
          })
        )
        // minify html
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(
          print(function (file) {
            return "injecting " + file;
          })
        )

        .pipe(gulp.dest("./dist"))
    );
  })
);

gulp.task("build:dev", function () {
  // inject partials contents into index.html file
  return (
    gulp
      .src("./src/*.html")
      // inject javascript contents into index.html file
      .pipe(
        inject(gulp.src(["./src/**/*.js", "!./src/**/admin.js"]), {
          starttag: "<!-- inject:js:js -->",
          transform: function (filePath, file) {
            // return file contents as string
            return "<script>" + file.contents.toString("utf8") + "</script>";
          }, // end transform
        })
      )
      // inject nav partials contents into index.html file
      .pipe(
        inject(gulp.src(["./src/partials/nav.html"]), {
          starttag: "<!-- inject:nav:html -->",
          transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString("utf8");
          }, // end transform
        })
      )
      // inject nav partials contents into index.html file
      .pipe(
        inject(gulp.src(["./src/partials/modal.html"]), {
          starttag: "<!-- inject:modal:html -->",
          transform: function (filePath, file) {
            // return file contents as string
            return file.contents.toString("utf8");
          }, // end transform
        })
      )

      // inject css contents into index.html file
      .pipe(
        inject(gulp.src(["./src/**/*.css", "!./src/**/admin.css"]), {
          starttag: "<!-- inject:css:css -->",
          transform: function (filePath, file) {
            // return file contents as string
            return "<style>" + file.contents.toString("utf8") + "</style>";
          }, // end transform
        })
      )
      // minify html
      //   .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(
        print(function (file) {
          return "injecting " + file;
        })
      )

      .pipe(gulp.dest("./dist"))
  );
});
