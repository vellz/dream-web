'use strict';

function get(s) {
  if (s instanceof Date) {
    return s;
  } else {
    return new Date(s);
  }
}

export function format(s, pattern) {
  var two = function(numStr) {
    return ('00' + numStr).slice(-2);
  };

  var date = get(s);

  var dateObj = {
    'YYYY': date.getFullYear(),
    'YY': two(date.getFullYear()),
    'MM': two(date.getMonth() + 1),
    'M': date.getMonth() + 1,
    'DD': two(date.getDate()),
    'D': date.getDate(),
    'hh': two(date.getHours()),
    'h': date.getHours(),
    'mm': two(date.getMinutes()),
    'm': date.getMinutes()
  };

  // 支持 - . / 空格 年 月 日 作为分隔符
  var pieces = pattern.split(/(-|\.|[\u4e00-\u9fa5]{1}| |\/|\:)/);
  var ret = pieces.map(function(it) {
    return dateObj[it] || it;
  });

  return ret.join('');
}