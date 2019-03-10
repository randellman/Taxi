const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminOptipng = require("imagemin-optipng");
const imageminSvgo = require("imagemin-svgo");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  assets: "assets/"
}

module.exports = {
	externals: {
    	paths: PATHS
  	},
	entry: {
		app: PATHS.src
	},
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.dist,
		publicPath: "./"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: "/node_modules/" 
			},
			{
		        test: /\.html$/,
		        use: [
					{
						loader: "html-loader",
						options: { 
						  minimize: true,
						  removeComments: true,
						  sourceMap: true,
						}
					}
		        ]
		    }, 
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
				    {
						loader: "style-loader"           
					}, 
					{
						loader: MiniCssExtractPlugin.loader,           
					},      
					{
						loader: "css-loader",
							options:{ sourceMap: true }
					},
					{
						loader: "postcss-loader",
							options: { sourceMap: true, config: { path: `${PATHS.src}/postcss.config.js` } }
					},
					{
						loader: "resolve-url-loader",
							options:{ sourceMap: true}            
					}, 
					{
						loader: "sass-loader",
							options:{ sourceMap: true }
					}
				]
			},
		    {
				test: /\.(ttf|eot|woff|woff2)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: `${PATHS.assets}fonts/`
						}
					}	
				]
			},
			{ 
		        test: /\.(jpe?g|png|gif|svg)$/i,
		        use: [
		        	{
				        loader: "file-loader",
				        options: {
					    	name: `${PATHS.assets}img/[name].[ext]`
		        		}
		        	},
		        ]
		    }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
	      "$": "jquery",
	      "jQuery": "jquery",
	    }), 
		new HtmlWebPackPlugin({
	      hash: false,
	      template: `${PATHS.src}/index.html`,
	      filename: "./index.html"
	    }),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`,
		}),
		new CopyWebpackPlugin([
	      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` }
	    ]),
	    new ImageminPlugin({
		  test: /\.(jpe?g|png|gif|svg)$/i,
	      bail: false,
	      cache: true,
	      filename: `${PATHS.assets}img/[name].[ext]`,
	      exclude: /node_modules/,
	      imageminOptions: {
	        plugins: [
	          imageminGifsicle({
	            interlaced: true,
	            optimizationLevel: 3
	          }),
	          imageminJpegtran({
	            progressive: true
	          }),
	          imageminOptipng({
	            optimizationLevel: 3
	          }),
	          imageminSvgo({
	            removeViewBox: true
	          })
	        ]
	      }
	    }), 
	]    
}