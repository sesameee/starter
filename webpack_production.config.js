var Webpack = require('webpack'),
    path = require('path'),
    util = require('util'),
    pkg = require('./package.json'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer-core'),
    csswring = require('csswring');

var nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    buildPath = path.resolve(__dirname, 'dist'),
    cssBundleName = util.format('css/style.bundle.%s.css', pkg.version),
    jsBundleName = util.format('js/[name].%s.js', pkg.version);

module.exports = {
    // This is the main file that should include all other JS files
    entry: {
        app: path.resolve(__dirname, 'scripts/app.jsx'),
        vendors: ['react', 'flux', 'react-router', 'underscore', 'keymirror', 'superagent', 'js-sha256']
    },
    target: "web",
    debug: true,
    // We are watching in the gulp.watch, so tell webpack not to watch
    watch: false,
    // watchDelay: 300,
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
        filename: jsBundleName,
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        // Tell webpack to look for required files in bower and node
        modulesDirectories: ['bower_components', 'node_modules'],
        alias: {
            'env': path.resolve(__dirname, './config/' + (process.env.NODE_ENV || "development") + '.js'),
            'version': path.resolve(__dirname, './config/version.js')
        },
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    module: {
        loaders: [

            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
                exclude: nodeModulesPath
            }, {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=8192&name=images/[name].[ext]'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=8192&name=fonts/[name].[ext]'
            }, {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

                query: {
                    presets: ['es2015', 'react']
                }
            }
        ],
        noParse: /\.min\.js/
    },
    plugins: [
        new ExtractTextPlugin(cssBundleName),
        new HtmlWebpackPlugin({
            template: './index_temp.html', // Load a custom template
            inject: 'body',
            filename: '../../index.html'
        }),
        new Webpack.ProvidePlugin({}),
        new Webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ],
    postcss: function() {
        return [autoprefixer, csswring];
    }
};
