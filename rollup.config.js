/* eslint-disable @typescript-eslint/no-var-requires */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
const pkg = require('./package.json');

export default {
  input: './src/ScrollDirection.ts',
  output: {
    file: pkg.main,
    format: 'umd',
    sourcemap: true,
    name: 'ScrollDirection',
  },
  plugins: [
    commonjs(),
    resolve(),
    typescript(),
    babel({
      exclude: [/\/core-js\//, /\/core-js-pure\//, /\/runtime-corejs3\//],
      runtimeHelpers: true,
      sourceMap: true,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'],
    }),
    terser(),
  ],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**',
  },
};
