"use strict";

/**
 * Api路由(for Ajax)
 * java服务端接口都需要在此透传，供客户端使用
 * 最好是整成rest风格
 */

import KoaRouter from 'koa-router';
import requireDir from 'require-dir';

let controllers = requireDir('../controllers');

export default () => {

  let router = new KoaRouter();

  router
    .get('/', controllers.dream.init)
    .get('/create', controllers.dream.create)
    .get('/mine', controllers.dream.myDream)
    .get('/detail', controllers.dream.detail)
    .post('/list/dream/:page', controllers.dream.getPage);

  return router;
}