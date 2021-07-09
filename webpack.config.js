const path = require('path');

module.exports = {
	mode: 'none',
	entry: {
		index: path.join(__dirname, 'src', 'pages', 'index.tsx'),
		notes: path.join(__dirname, 'src', 'pages', 'notes.tsx'),
		calendar: path.join(__dirname, 'src', 'pages', 'calendar.tsx')
	},
	target: 'web',
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: '/node_modules/'
			}
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/js/')
	}
}
