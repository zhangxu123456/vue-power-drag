const webpack = require('webpack')
const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000', //API服务器的地址
				ws: true, //代理websockets
				changeOrigin: true, // 虚拟的站点需要更管origin
			},
		},
	},
	lintOnSave: false,
	chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
	},
	configureWebpack: {
		plugins: [
		  new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'windows.jQuery': 'jquery'
		  })
		]
	  }
}
