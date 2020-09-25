const fs = require('fs');
module.exports = class FaviconPlugin {
	constructor(props){
		this.filePath = props.filePath;
		this.outputPath = props.outputPath
	}
	apply(compiler){
		// 确定好要输出哪些文件，执行文件输出，可以在这里获取和修改输出内容
    compiler.hooks.emit.tapAsync('faviconPlugin', (compilation, callback) => {
			let promise = new Promise((resolve,reject) => {
				fs.readFile(this.filePath,(error,data)=>{
					if(error) reject(error)
					fs.writeFile(this.outputPath,data,(err)=>{
						if(err) reject(err)
						resolve('success')
					})
				})
			})
      // 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。
			// 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。
			promise.then(res=>{
				callback()
			}).cacth(e=>{
				callback()
			})
        
    });
	}
}