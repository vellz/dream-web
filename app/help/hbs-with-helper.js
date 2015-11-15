'use strict';

import hbs from 'koa-hbs';
import {
  format
}
from './date';

hbs.registerHelper('if', function(conditional, options) {
  //支持 conditional 为表达式
  if (eval(conditional)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('compare', function(v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('isNotEmpty', function(param, options) {
  if (param && param !== '') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper('dateFormat', function(date, pattern) {
  return format(date, pattern);
});
hbs.registerHelper('math', function(v, expression) {
  return eval(v + '' + expression);
});
hbs.registerHelper('percent', function(part, all) {
  return (part * 100 / all) + '%';
});

/**
 * [description]
 * @param  {[type]} left      [description]
 * @param  {[type]} operator  [">", "=", "<=", etc...]
 * @param  {[type]} right     [description]
 *
 * @example:
 *
    {{#when unicorns "<" ponies}}
      I knew it, unicorns are just low-quality ponies!
    {{/when}}

    {{#when value ">=" 10}}
      The value is greater or equal than 10
      {{else}}
      The value is lower than 10
    {{/when}}

 */
hbs.registerHelper('when', function(left, operator, right, options) {

  if (arguments.length < 3) {
    throw new Error('Handlebars Helper "compare" needs 2 parameters');
  }

  if (options === undefined) {
    options = right;
    right = operator;
    operator = '===';
  }

  var operators = {
    '==': function(l, r) {
      return l == r;
    },
    '===': function(l, r) {
      return l === r;
    },
    '!=': function(l, r) {
      return l != r;
    },
    '!==': function(l, r) {
      return l !== r;
    },
    '<': function(l, r) {
      return l < r;
    },
    '>': function(l, r) {
      return l > r;
    },
    '<=': function(l, r) {
      return l <= r;
    },
    '>=': function(l, r) {
      return l >= r;
    },
    'typeof': function(l, r) {
      return typeof l == r;
    },
    'indexOf': function(l, r) {
      return l.indexOf(r) >= 0;
    },
    'startWith': function(l, r) {
      return l.indexOf(r) === 0;
    },
    'endWith': function(l, r) {
      return l.indexOf(r) === r.length - 1;
    }
  };

  if (!operators[operator]) {
    throw new Error('Handlebars Helper "when" doesn\'t know the operator ' + operator);
  }

  var result = operators[operator](left, right);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

export default hbs;
