// common constants
const path = require('path');
const requireContext = require('require-context');

// plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const autoprefixer = require('autoprefixer');

// file collections
const css = requireContext(__dirname + '/src/css', false, /\.css$/)

function importAll(files, path) {
    return files.keys().map(file => {
        return path + '/' + file
    })
}

module.exports = {
    mode: 'production',
    entry: {
        app: [
            './js/index.js',
            ...importAll(css, './css')
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 11', 'last 4 version']
                                })
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                exclude: /(node_modules|bower_components)/
            }),
            new OptimizeCSSAssetsPlugin({}),
            new CopyPlugin([
                { from: 'images/tours', to: 'images/tours' },
                { from: 'images/team', to: 'images/team' },
                { from: 'images/icons', to: 'images/icons' },
                { from: 'images/extra', to: 'images/extra' },
            ]),
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
        ]
    }
};