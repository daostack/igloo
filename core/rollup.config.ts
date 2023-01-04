import sourceMaps from 'rollup-plugin-sourcemaps';
import ts from 'rollup-plugin-ts';
import cleaner from 'rollup-plugin-cleaner';
import json from '@rollup/plugin-json';

const pkg = require('./package.json');

const libraryName = 'igloo-steps';

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: libraryName, format: 'cjs', sourcemap: true },
    { file: pkg.module, name: libraryName, format: 'es', sourcemap: true },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  watch: {
    buildDelay: 1000,
    include: 'src/**',
  },
  plugins: [
    json(),
    ts({
      tsconfig: './tsconfig.build.json',
    }),
    sourceMaps(),

    // Resolve source maps to the original source
    cleaner({
      targets: ['./dist/'],
    }),
  ],
};
