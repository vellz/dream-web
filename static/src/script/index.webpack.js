'use strict';

var $ = require('./lib/jquery.min');
var Promise = require('./lib/es6-promise.min').Promise;
var app = require('./mod/app');

var addContent = '\
  <h4>日志</h4>\
  <form action="/" class="form-horizontal">\
    <div class="form-group">\
      <label class="col-sm-4 control-label">上传图片：</label>\
      <div class="col-sm-8">\
        <input type="file" name="upload-img" class="form-control" accept="image/*">\
      </div>\
    </div>\
    <div class="form-group">\
      <label class="col-sm-4 control-label">今日完成：</label>\
      <div class="col-sm-8">\
        <textarea name="text" class="form-control"></textarea>\
      </div>\
    </div>\
    <div class="form-group col-sm-12">\
      <a href="javascript:;" class="btn btn-primary btn-wrap btn-submit" data-role="modal::close">确定</a>\
    </div>\
  </form>';

(function() {
  var model = {
    page: 0,
    get: function(page) {
      return app.fetch('/list/dream/' + page, {}, {
        show: function() {
          $('.loading').prop('visibility', 'visible');
        },
        hide: function() {
          $('.loading').prop('visibility', 'hidden');
        }
      })
        .then(function(data) {
          return Promise.resolve(data.html);
        });
    }
  };
  var view = {
    showAddModal: function() {
      var aModal = new app.ui.Modal({
        id: 'addModal',
        css: 'modal-add',
        content: addContent
      });
      aModal.show();
    }
  };
  var ctrl = {
    init: function() {
      this.evt();
      model.get(0);
    },
    loadPage: function() {
      model.page += 1;
      model.get(model.page)
        .then(function(html) {
          $('#dreams').append(html);
        });
    },
    evt: function() {
      $(window).scroll(function() {
        var screenH = document.documentElement.clientHeight;
        var bodyH = document.body.scrollHeight;
        var scrollT = document.body.scrollTop;
        if (scrollT + screenH >= bodyH - 5) {
          ctrl.loadPage();
        }
      });
      $('#add').on('click', function() {
        view.showAddModal();
      });
    }
  };

  $(function() {
    app.init()
      .then(function() {
        ctrl.init();
      });
  });
}());