const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

// localhost:9000 serves ./index.html
app.use(serve(__dirname));

const PORT = 9000;
console.log(`PIXI server started on port: ${PORT}`);
app.listen(PORT);
