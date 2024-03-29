// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import autoprefixer from 'autoprefixer';

//NEW
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJson from './package.json' assert { type: 'json' };

import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import svgImport from 'rollup-plugin-svg-import';

export default defineConfig([
	{
		input: 'src/index.ts',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: true,
				name: packageJson.name,
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [
			peerDepsExternal(),
			// CSS Config
			postcss({
				minimize: true,
				modules: true,
				plugins: [autoprefixer()],
				use: {
					sass: null,
					stylus: null,
					less: { javascriptEnabled: true },
				},
				extract: true,
				extract: 'titlebar.css',
			}),
			nodeResolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.eslint.json',
				exclude: ['**/__tests__', '**/*.{test,stories,spec}.{js,jsx,ts,tsx}'],
			}),
			terser(),
			// process SVG to DOM Node or String. Default: false
			svgImport({
				stringify: false,
			}),
			image(),
		],
	},
	{
		// path to your declaration files root
		input: './dist/esm/types/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [dts()],
	},
]);
