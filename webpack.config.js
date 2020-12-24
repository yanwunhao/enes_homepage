const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require('path')

module.exports = {
    mode: 'development',

    entry: {
        'people': './src/people/app.js',
        'individual': './src/individual/app.js'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]/[name].js',
    },

    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        port: 8000,
        open: true
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/people/index.html',
            filename: 'people.html',
            chunks: ['people']
        }),
        new HtmlWebpackPlugin({
            template: './src/individual/index.html',
            filename: 'individual.html',
            chunks: ['individual']
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'less-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    }
}