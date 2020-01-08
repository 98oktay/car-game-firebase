const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        "index": './src/js/index.es6',
        "product": './src/js/product.es6'
    },
    output: {
        filename: '[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'dist/'
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: "-",
            minSize: 10000,
        }
    },
    stats: 'errors-warnings',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        index: "index.html",
        port: 9000
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.es6|\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/preset-react'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.jpe?g|\.png$/,
                use: ['file-loader']
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-loader']
            },
        ]

    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "[name].style.[contenthash].css"
        }),
        new optimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ["default", {discardComments: {removeAll: true}}]
            },
            canPrint: true
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "**/*",
                path.join(process.cwd(), "dist/**/*")
            ]
        }),
        new htmlWebpackPlugin({
            template: "src/index.hbs",
            filename: "index.html",
            chunks: ["vendors-index", "vendors-index-product", "index"],
            title: "Audi A3",
            meta: {
                viewport: "width:device-with, initial-scale=1, user-scalable=0"
            }
        }),
        new htmlWebpackPlugin({
            template: "src/index.hbs",
            filename: "product.html",
            chunks: ["vendors-product", "vendors-index-product", "product"],
            title: "Product",
            meta: {
                viewport: "width:device-with, initial-scale=1, user-scalable=0"
            }
        })
    ]
};
