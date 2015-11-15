/*
  ignorePartials : ignores any unknown partials. Useful if you only want to handle part of the file
  partials : Javascript object that will fill in partials using strings
  batch : Javascript array of filepaths to use as partials
  helpers: javascript functions to stand in for helpers used in the handlebars files
  data : optional -- custom data in handlebars template ({{var_name}})
*/
var fs = require('fs');
var path = require('path');
var config = require(path.join(process.env.FBI_RUN_PATH, 'fbi.json'));
var Handlebars = require(path.join(process.env.FBI_NODEMODULES_PATH, 'handlebars'));

// for components
var com_obj = {};

var handlebars_config = {
  ignorePartials: true,
  helpers: {
    if: function(conditional, options) {
      if (conditional) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    compare: function(v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    isNotEmpty: function(param, options) {

      if (param && param !== '') {
        // handlebars_config.data['component-style'] = param;
        // console.log(this)
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    }
  },
  data: {
    "demo": "this is a demo"
  }
};

module.exports = handlebars_config;