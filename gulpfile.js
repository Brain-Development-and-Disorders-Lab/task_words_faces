// Gulp modules
const gulp = require("gulp");

// Other modules
const del = require("del");

/**
 * Copy resources into the `dist` output directory
 * @param {() => void} cb callback function
 */
const resources = (cb) => {
  // Copy all stimuli to `dist` output directory
  gulp.src("./src/img/**/*").pipe(gulp.dest("./dist/img/"));
  cb();
};

/**
 * Clean up build artefacts
 * @param {function} cb callback function
 */
const clean = (cb) => {
  // Extend this array with additional directories or files for removal
  del(["dist"]);
  cb();
};

exports.resources = resources;
exports.clean = clean;
exports.default = clean;
