'use strict';

var $ = require('../lib/jquery.min');
var Hbs = require('../lib/handlebars');

(function() {
  //必要元素
  //*[data-role="modal::close"]点击此元素窗口消失
  //有 {{id}}, {{{content}}}
  var defaultTpl = '\
    <div class="modal {{css}}" id="{{id}}">\
      <div class="wrap" {{#if bgClickClose}} data-role="modal::close" {{/if}}>\
        <div class="main j-main">\
          {{#if showClose }}\
          <a href="javascript:;" class="btn-close" data-role="modal::close"><i class="ico-close"></i></a>\
          {{/if}}\
          <div class="content">{{{content}}}</div>\
        </div>\
      </div>\
    </div>';

  function Modal(opts) {
    this.opts = $.extend({
      id: 'modal' + Date.now(),
      css: '',
      showClose: false,
      bgClickClose: false,
      autoClose: false,
      remove: true,
      beforeClose: function() {},
      content: '',
      tpl: defaultTpl
    }, opts);
    this.init();
  }

  Modal.prototype = {
    //modal wrapper
    jq: null,
    //拼装DOM
    getDom: function() {
      var opts = this.opts;
      var hbsTpl = Hbs.compile(opts.tpl);
      return hbsTpl({
        id: opts.id,
        css: opts.css,
        showClose: opts.showClose,
        bgClickClose: opts.bgClickClose,
        content: opts.content
      });
    },
    //将 DOM 添加到 html 中
    init: function() {
      var $el = $('#' + this.opts.id);
      if ($el.length) {
        $el.remove();
      }
      var elHtml = this.getDom();
      $('body').append(elHtml);

      this.jq = $('#' + this.opts.id);

      this.evt();
    },
    show: function() {
      var self = this;

      this.jq.show();

      if (this.opts.autoClose) {
        setTimeout(function() {
          self.hide();
        }, this.opts.autoClose || 3000);
      }
    },
    hide: function() {
      if (this.opts.remove) {
        this.jq.remove();
      } else {
        this.jq.hide();
      }
    },
    evt: function() {
      var self = this;
      this.jq
        .on('click', '[data-role="modal::close"]', function() {
          self.opts.beforeClose(self.jq);
          self.hide();
        })
        .on('click', '.j-main', function(e) {
          e.stopPropagation();
        });
    }
  };

  module.exports = Modal;
}());