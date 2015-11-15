"use strict";

/**
 * 路由嵌套整合
 * (路由增删后需在这里修改，否则会无效或报错)
 */

import KoaRouter from 'koa-router';
import dreamRouter from './dream';

export default () => {

  let appRouter = new KoaRouter();
  let dreamRoute = new dreamRouter();

  appRouter.use(
    dreamRoute.routes()
  );

  return appRouter;
}