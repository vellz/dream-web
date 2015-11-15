'use strict';

/**
 * 注册登录控制器
 */
import dreamPage0 from '../data/dream.json';
import hbs from '../help/hbs-with-helper';
import fs from 'fs';
import path from 'path';

export default {
  //首页
  init: function*() {
    yield this.render('index', {
      list: dreamPage0
    });
  },
  //放飞梦想
  create: function*() {
    yield this.render('create');
  },
  //我的梦想
  myDream: function*() {
    yield this.render('detail');
  },
  detail: function*() {
    yield this.render('detail');
  },
  //分页输出列表
  getPage: function*() {
    var page = this.params.page;
    var source = fs.readFileSync(path.join(__dirname, '../views/partials', 'dreams.hbs'), 'utf-8');
    var template = hbs.handlebars.compile(source);
    console.log(source, dreamPage0);
    this.response.set({
      'Content-Type': 'application/json;UTF-8'
    });
    this.response.body = {
      html: template({
        list: dreamPage0
      })
    };
  }
};
