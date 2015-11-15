"use strict";

import path from 'path';
import koa from 'koa';
import json from 'koa-json';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger';
import onerror from 'koa-onerror';
import serve from 'koa-static';
import routes from './routes';
import hbs from './help/hbs-with-helper';
import config from './config.json';
import session from 'koa-session';

let app = koa();
let router = new routes();

for (let key in config) {
  global[key] = config[key];
}

// error handler
onerror(app);

// use middleware
app.use(session(app));
app.use(logger());
app.use(compress());
app.use(bodyParser());
app.use(json({
  pretty: app.env === 'development'
}));

// koa-hbs is middleware. `use` it before you want to render a view
app.use(hbs.middleware({
  viewPath: path.join(__dirname, './views'),
  partialsPath: [path.join(__dirname, './views/partials'), path.join(__dirname, '../static/dist/css'), path.join(__dirname, '../static/dist/js')]
}));

// router
app
  .use(router.routes())
  .use(router.allowedMethods());

// static server
app.use(serve(path.join(__dirname, '../static/dist/')));

// start server
let PORT = process.env.PORT || 9000;

app.listen(PORT, err => {
  if (err) {
    throw err;
  }
  console.log(`listening on PORT: ${PORT}`);
});
