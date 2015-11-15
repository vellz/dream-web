'use strict';

var $ = require('../lib/jquery.min');
var Promise = require('../lib/es6-promise.min').Promise;
var ajaxGif = require('./ajax-gif');

(function() {

  //专用于通过 node 作为中间桥梁向后台请求数据使用
  function fetchApi(uri, data, appDw, gifMod) {
    gifMod = gifMod || ajaxGif;
    return new Promise(function(resolve, reject) {
      gifMod.show();
      $.ajax({
        'url': uri,
        'type': 'POST',
        'data': data || {},
        'dataType': 'JSON'
      }).done(function(response) {
        gifMod.hide();
        resolve(response);
        /*
        if (+response.code === 1000000) {
          resolve(response.data);
        } else {
          reject({
            msg: response.error_msg
          });
        }*/
      }).fail(function() {
        gifMod.hide();

        reject({
          msg: '服务器错误'
        });
      });
    });
  }

  module.exports = {
    api: fetchApi
  };

}());