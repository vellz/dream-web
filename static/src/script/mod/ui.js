'use strict';

var Modal = require('./modal');

module.exports = {
  supportTouch: function() {
    var status = 'ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/) ||
      window.DocumentTouch && document instanceof window.DocumentTouch ||
      window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0 || //IE 10
      window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0 || //IE >=11
      false;
    return !!status;
  },
  Modal: Modal,
  msg: function(message, autoClose) {
    var msgModal = new Modal({
      id: 'msgModal',
      css: 'modal-msg',
      content: message,
      autoClose: autoClose === undefined ? 3000 : autoClose,
      bgClickClose: true
    });
    msgModal.show();
  }
};