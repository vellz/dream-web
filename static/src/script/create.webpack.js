'use strict';

var $ = require('./lib/jquery.min');
var Promise = require('./lib/es6-promise.min').Promise;
var app = require('./mod/app');

(function() {
  var model = {
    step: 0
  };
  var view = {
    stepTo: function(step) {
      $('.j-step-o').removeClass('active')
        .eq(step).addClass('active');
      $('.j-step-cnt').hide()
        .eq(step).show();
    }
  };
  var ctrl = {
    init: function() {
      this.evt();
    },
    evt: function() {
      $('.j-btn-next')
        .on('click', function() {
          model.step += 1;
          view.stepTo(model.step);
        });
      $('.j-btn-prev')
        .on('click', function() {
          model.step -= 1;
          view.stepTo(model.step);
        });
      $('.j-btn-submit')
        .on('click', function() {
          location.href = '/detail';
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