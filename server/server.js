const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const static = require('koa-static');
// const send = require('koa-send');
const path = require('path');
app.use(static(path.join(__dirname,'../dist')));

// const renderer = require('vue-server-renderer').createRenderer({
//   template: require('fs').readFileSync(path.join(__dirname,'../src/index.template.html'), 'utf-8')
// });

const router  = new Router();

// const Vue = require('vue');
// const createApp = require(path.join(__dirname,'../dist/static/main-bundle.js'));


// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("../dist/static/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/static/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: require('fs').readFileSync(path.join(__dirname,'../src/index.template.html'), 'utf-8'),
  clientManifest: clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}

router.get('/(.*)',async (ctx) => {
	ctx.res.setHeader("Content-Type", "text/html");
	const html = await renderToString({url:ctx.url});
	ctx.body = html;
})

app.use(router.routes());

app.listen(3006, () => {
	console.log('服务地址：http://localhost:3006')
})