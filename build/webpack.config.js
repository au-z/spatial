const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (rel) => path.resolve(__dirname, '..', rel)

const load = (test, ...use) => ({test, use, exclude: /node_modules/})

module.exports = (env) => ({
	mode: env.prod ? 'production' : 'development',
	devtool: env.prod ? 'cheap-eval-source-map' : 'source-map',
	entry: {
		'am-elements': resolve('src/index.ts'),
	},
	output: {
		path: resolve('dist'),
		filename: env.prod ? `[name].min.js` : `[name].js`,
		library: `[name]`,
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			load(/\.(j|t)s?$/, 'babel-loader'),
			load(/\.styl(us)?$/, 'raw-loader', 'stylus-loader'),
			{
				...load(/\.css$/, 'raw-loader'),
				exclude: /node_modules\/(?!(highlight\.js))/,
			},
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.json', '.styl', '.css'],
		alias: {
			'src': resolve('src'),
			'style': resolve('src/style'),
		},
	},
	optimization: {
		usedExports: true,
	},
	plugins: [
		env.dev ? new HtmlWebpackPlugin({
			template: resolve('build/index.html'),
			inject: 'body',
		}) : {apply: () => null},
	],
	devServer: {
		port: 9578,
		historyApiFallback: true,
	},
})
