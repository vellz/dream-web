'use strict';

var Promise = require('../lib/es6-promise.min').Promise;
var FastClick = require('../lib/fastclick');

var ui = require('./ui');
var help = require('./help');
var fetch = require('./fetch');
var store = require('./store');

(function() {
  var dwDataDefault = {
    name: 'dream',
    version: '1.0.0'
  };
  var dw = {
    _data: {},
    set: function(name, value, beLocal) {
      //beLocal 为 true 时该数据将保存到本地
      if (value !== undefined) {
        this._data[name] = value;
      }
      if (beLocal) {
        store.set(name, value);
      }
      return value;
    },
    get: function(name) {
      //数据来源优先级 _data > store > dwDataDefault
      var v = this._data[name];

      if (v !== undefined) {
        return v;
      } else {
        v = store.get(name);
      }

      if (v !== undefined) {
        return this.set(name, v);
      } else {
        return dwDataDefault[name];
      }
    },
    remove: function(name) {
      this._data[name] = undefined;
      store.remove(name);
    },
    recover: function() {
    },
    reset: function() {
      for (var name in dwDataDefault) {
        this._data[name] = dwDataDefault[name];
      }
    },
    clear: function() {
      //保存不需要清理的数据
      var doNotClear = {};
      var name;
      for (name in dwDataDefault) {
        doNotClear[name] = this.get(name);
      }

      store.clear();

      this.reset();

      //将数据重新写入本地存储中
      for (name in doNotClear) {
        this.set(name, doNotClear[name], 1);
      }
    }
  };

  var model = {
    fetch: function(uri, data, gifMod) {
      return fetch.api(uri, data, dw, gifMod);
    },
    checkLogin: function() {
      var isLogin = !!dw.get('sid');
      if (isLogin) {
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    }
  };

  function init() {
    //数据初始化
    dw.reset();
    //将数据从缓存中恢复到dw
    dw.recover();

    if (ui.supportTouch && FastClick) {
      FastClick.attach(document.body);
    }

    return Promise.resolve();
  }

  module.exports = {
    help: help,
    ui: ui,
    dw: dw,
    init: init,
    fetch: model.fetch
  };
}());