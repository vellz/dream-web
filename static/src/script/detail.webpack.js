'use strict';

var $ = require('./lib/jquery.min');
var Promise = require('./lib/es6-promise.min').Promise;
var app = require('./mod/app');

(function() {

  var model = {
    newStatus: function($el) {
      var ed = $el.is('.ed');
      var num = +$.trim($el.find('var').text());
      return {
        ed: !ed,
        num: !ed ? num + 1 : num - 1
      }
    }
  };
  var view = {
    updateStatus: function($el, status) {
      if (status.ed) {
        $el.addClass('ed');
      } else {
        $el.removeClass('ed');
      }
      $el.find('var').text(status.num);
    }
  };
  var ctrl = {
    init: function() {
      this.evt();
    },
    evt: function() {
      $('#proves')
        .on('click', '.j-inter-act', function() {
          var status = model.newStatus($(this));
          view.updateStatus($(this), status);
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