/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const { dest, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const run = require('gulp-run');
const pkg = require('./package.json');
const path = require('path');

const esmJs = path.parse(pkg.module);
const dTs = path.parse(pkg.typings);

function buildJs(cb) {
  tsProject
    .src()
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(tsProject())
    .js.pipe(terser())
    .pipe(
      sourcemaps.write('./', {
        sourceMappingURL() {
          return `${esmJs.base}.map`;
        },
      }),
    )
    .pipe(
      rename(path => {
        path.basename = esmJs.name;
        if (path.extname === '.map') {
          path.basename += '.js';
        }
      }),
    )
    .pipe(dest(esmJs.dir));

  cb();
}

function buildDts(cb) {
  tsProject
    .src()
    .pipe(
      ts({
        declaration: true,
      }),
    )
    .dts.pipe(rename(dTs.base))
    .pipe(dest(dTs.dir));

  cb();
}

function rollup(cb) {
  run('rollup -c').exec();

  cb();
}

const build = parallel(buildJs, buildDts, rollup);
exports.build = build;
exports.default = build;
