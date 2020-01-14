import {terser} from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import Utils from 'rollup-plugin-app-utils'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

console.log('Runing build: ', process.env.NODE_ENV);
export default {
    input: 'src/ObservablePrfi.js',
    output: [
        {
            sourcemap: true,
            format: 'umd',
            name :'ObservablePrfi',
            file: 'dist/ObservablePrfi.js',
            plugins: []
        },
        {
            format: 'umd',
            file: 'dist/min/ObservablePrfi.min.js',
            name :'ObservablePrfi',
            plugins: [
                terser(),
            ]
        }
    ],
    plugins: [
        Utils.prepareDirectories('dist'),
        postcss({
            minimize: process.env.NODE_ENV === 'production' ? true : false,
            sourceMap: process.env.NODE_ENV === 'production' ? false : true,
            extract: true,
            plugins: [
                autoprefixer
            ]
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs(),
    ]
};
