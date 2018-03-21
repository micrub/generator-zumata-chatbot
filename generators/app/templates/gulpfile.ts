// @ts-check

/** Import project dependencies */
import del from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import sq from 'gulp-sequence';
import lint from 'gulp-tslint';
import ts from 'gulp-typescript';
import * as tslint from 'tslint';

/** Setting up */
const isProd = process.env.NODE_ENV === 'production';
const SRC = 'src';
const TMP = '.tmp';
const DIST = 'dist';
const BABELRC = {
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
        spec: true,
        modules: false,
        useBuiltIns: true,
      },
    ],
    ...(isProd ? [
      [
        'minify',
        {
          replace: false,
          removeConsole: false,
          removeDebugger: true,
        },
      ],
    ] : []),
  ],
  plugins: [
    ['transform-object-rest-spread', { useBuiltIns: true }],
  ],
  ignore: isProd
    ? [
      '**/__mocks*__/*.js',
      '**/__tests*__/*.dist.spec.js',
      '**/__tests*__/*.spec.js',
    ]
    : [],
};

gulp.task('lint', () =>
  gulp.src([
    `${SRC}/**/*.ts`,
    `${SRC}/**/*.tsx`,
  ])
    .pipe(lint({
      configuration: `tslint${isProd ? '.prod' : ''}.json`,
      formatter: 'stylish',
      program: tslint.Linter.createProgram('./tsconfig.json'),
    }))
    .pipe(lint.report()));

gulp.task('ts', () =>
  gulp.src([
    `${SRC}/**/*.ts`,
    `${SRC}/**/*.tsx`,
  ])
    .pipe(ts.createProject('./tsconfig.json')())
    .pipe(gulp.dest(TMP)));

gulp.task('babel', () =>
  gulp.src([
    `${TMP}/**/*.js`,
  ])
    .pipe(babel(BABELRC))
    .pipe(gulp.dest(DIST)));

gulp.task('clean', () => del([
  TMP,
  DIST,
]));

gulp.task('clear', () => del([
  TMP,
]));

gulp.task('copy', () => gulp.src([
  `${SRC}/**/*.json`,
  `${SRC}/**/*.md`,
  `${TMP}/**/*`,
  `!${TMP}/**/*.js`,
])
  .pipe(gulp.dest(DIST)));

gulp.task('watch', () => {
  gulp.watch([
    `${SRC}/**/*.ts`,
    `${SRC}/**/*.tsx`,
  ], ['build']);
});

gulp.task('build', ['clean'], cb => sq(...[
  'lint',
  'ts',
  ['babel', 'copy'],
  'clear',
])(cb));

gulp.task('default', ['watch'], sq('build'));
