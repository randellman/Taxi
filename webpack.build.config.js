const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: "production",
	plugins: [

    	new UglifyJsPlugin({
	        cache: true,
	        parallel: true,
	        sourceMap: true
        }),
	]
})

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig)
})
