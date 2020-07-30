const {VueLoaderPlugin} = require('vue-loader');
var nodeExternals = require('webpack-node-externals');
module.exports = {
    externals: [nodeExternals({
    whitelist: ['commonjs', 'webpack/hot/dev-server', /^lodash/]
})], // in order to ignore all modules in node_modules folder
    entry:'./src/app/index.js',
    output:{
        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },
    externals: {
        "element-ui": "ELEMENT"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /.ttf$|.woff$/,
                use: [{ loader: "url-loader", options: { limit: 10000 } }]
            },
            // {
            //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     loader: 'url',
            //     query: {limit: 10000, mimetype: "application/font-woff", name: utils.assetsPath('fonts/[name].[hash:7].[ext]')},
            // },
            // {
            //     test: /\.(eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url',
            //     query: {
            //         limit: 10000,
            //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //     },
            // },
            {
                test:  /\.html$/,
                use: ["html-loader"]
            },
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.(jpg|JPG|jpeg|png|gif|mp3|svg|ttf|woff2|woff|eot)$/gi,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets/fonts"
                    }
                }
            }
        ]
    },
    plugins:[
     new VueLoaderPlugin   
    ],
   devtool: 'source-map'
};