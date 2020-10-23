
const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');

const faviconPlugin = require('./src/js/favicon-plugin');
module.exports = () => {
	let env = process.env, outPath;
	if (env && env.path) {
		outPath = path.resolve(env.path, 'static');
	} else {
		outPath = path.resolve(__dirname, 'dist/static');
	}
	const target_node = env.target_node || 'client';
	return {
		entry: `./src/entry-${target_node}.js`,
		// {
		// 	'entry-client':'./src/entry-client.js',
		// 	'entry-server':'./src/entry-server.js'
		// },
		target: target_node==='server' ? 'node' : 'web',
    node: target_node==='server' ? undefined : false,
		output: {
			libraryTarget: target_node==='server' ? 'commonjs2' : undefined,
			path: outPath,
			filename: '[name]-bundle.js',
			chunkFilename: 'chunk-[chunkhash].js',
			publicPath: 'static/'
		},
		externals: target_node==='server'
      ? nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        allowlist: [/\.(css|scss)$/]
      })
      : undefined,
    optimization: {
      splitChunks: target_node==='server' ? false : undefined
    },
		module:{
			rules: [{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader']
			}, {
				test: /\.(gif|jpeg|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=1024'
			},{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins:['@babel/plugin-proposal-object-rest-spread']
					}
				}
			},{
				test: /\.vue$/,
				loader:'vue-loader',
				options: {
          // enable CSS extraction
          extractCSS: true
        }
			}]
		},
		mode:config['ENV'],
		plugins: (function () {
			var plugins = [
				new VueLoaderPlugin(),
				target_node==='server' ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
			];
			if(target_node!=='server'){
				plugins.push(
					new HtmlWebpackPlugin({
						template: './src/html/index.html',
						filename: '../ssr-index.html',
						inject: false,
						hash:true,
						favicon:path.join(__dirname,'./src/html/favicon.ico')
					})
				)
				plugins.push(new faviconPlugin({
					filePath:'./src/html/favicon.ico',
					outputPath:'./dist/favicon.ico'
				}))
			}
			return plugins;

		})(),
	}
	
}