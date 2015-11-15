'use strict';

var $ = require('../lib/jquery.min');

(function() {

  var ajaxGif = {
    exist: 0, // 当前 ajax 请求个数
    update: function(plusNum) {
      this.exist += plusNum;
      if (this.exist > 0) {
        this.show();
      } else {
        this.hide();
      }
    },
    show: function() {
      var $gif = $('#ajaxGif');
      if (!$gif.length) {
        $gif = $('<div id="ajaxGif"></div>').appendTo($('body'));
      }
      $gif.show();

      this.$gif = $gif;
    },
    hide: function() {
      if (this.$gif && this.$gif.length) {
        this.$gif.hide();
      }
    }
  };

  module.exports = ajaxGif;

}());