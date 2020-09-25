const Router = require('koa-router');
const router  = new Router();

// const Vue = require('vue');

router.get('*',(ctx,next) => {
	console.log(ctx)
	// const app = new Vue({
	// 	data:{
	// 		aa:'ceshi '
	// 	},
	// 	template:`
	// 		<div>这是测试 {{aa}} </div>
	// 	`
	// })
	// renderer.renderToString(app,(err,html) => {
	// 	if(err){
	// 		ctx.body = "error";
	// 		return;
	// 	}
	// 	resizeBy.body = html;
	// })
})

module.exports = router;