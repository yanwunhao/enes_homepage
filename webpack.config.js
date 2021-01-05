const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'development',

    entry: {
        'app': './src/app.js',
        'people': './src/people/app.js'
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]/app.js'
    },

    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        port: 8000,
        open: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            template: './src/people/index.html',
            filename: 'people.html',
            chunks: ['people']
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
}