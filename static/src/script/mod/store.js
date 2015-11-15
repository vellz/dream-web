/* jshint ignore:start */

'use strict';

var cookie = require('./cookie');

(function(win) {
  var store = {};
  var localStorageName = 'localStorage';
  var storage;

  store.disabled = false;
  store.set = function(key, value) {};
  store.get = function(key, defaultVal) {};
  store.has = function(key) {
    return store.get(key) !== undefined;
  };
  store.remove = function(key) {};
  store.clear = function() {};
  store.getAll = function() {};

  store.serialize = function(value) {
    return JSON.stringify(value);
  };
  store.deserialize = function(value) {
    if (typeof value !== 'string') {
      return undefined;
    }
    try {
      return JSON.parse(value);
    } catch ( e ) {
      return value || undefined;
    }
  };

  function isLocalStorageNameSupported() {
    try {
      return (localStorageName in win && win[localStorageName]);
    } catch ( err ) {
      return false;
    }
  }

  if (isLocalStorageNameSupported()) {
    // use localStorage
    storage = win[localStorageName];
    store.set = function(key, val) {
      if (val === undefined) {
        return store.remove(key);
      }
      storage.setItem(key, store.serialize(val));
      return val;
    };
    store.get = function(key, defaultVal) {
      var val = store.deserialize(storage.getItem(key));
      return (val === undefined ? defaultVal : val);
    };
    store.remove = function(key) {
      storage.removeItem(key);
    };
    store.clear = function() {
      storage.clear();
    };
    store.getAll = function() {
      var ret = {};
      store.forEach(function(key, val) {
        ret[key] = val;
      });
      return ret;
    };
    store.forEach = function(callback) {
      for (var i = 0; i < storage.length; i++) {
        var key = storage.key(i);
        callback(key, store.get(key));
      }
    };
  } else {
    // use cookie
    store.set = function(key, val) {
      if (val === undefined) {
        return store.remove(key);
      }
      cookie.set(key, val, {
        path: '/',
        expires: 30
      });
      return val;
    };
    store.get = function(key, defaultVal) {
      return cookie.getJSON(key) || defaultVal;
    };
    store.remove = function(key) {
      cookie.remove(key, {
        path: '/'
      });
    };
    store.clear = function() {
      var all = store.getAll();
      for (var key in all) {
        store.remove(key);
      }
    };
    store.getAll = function() {
      return cookie.getJSON();
    };
  }

  try {
    var testKey = '__storejs__';
    store.set(testKey, testKey);
    if (store.get(testKey) !== testKey) {
      store.disabled = true;
    }
    store.remove(testKey);
  } catch ( e ) {
    store.disabled = true;
  }
  store.enabled = !store.disabled;

  module.exports = store;

}(window));

/* jshint ignore:end */