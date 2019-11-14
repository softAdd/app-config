// common modules
const path = require('path');
const requireContext = require('require-context');

// plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const autoprefixer = require('autoprefixer');

// collections
const css = requireContext(__dirname + '/src/css', false, /\.css$/);

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
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        watchContentBase: true
    },
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
            filename: 'css/[name].css',
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                exclude: /(node_modules|bower_components)/
            }),
            new OptimizeCSSAssetsPlugin({}),
            new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
        ]
    }
};