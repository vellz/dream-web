'use strict';

import coRequest from 'co-request';
import md5 from '../help/md5';

function ajaxDoneHandler(ret) {
  let data;
  if (ret.statusCode === 200) {
    data = ret.body;
  } else {
    // console.log(ret.statusCode);
    // console.log(ret.body);
    data = JSON.stringify({
      code: ret.statusCode,
      err_msg: '与后台服务器通信失败'
    });
  }
  return {
    headers: ret.headers,
    body: data
  }
}

export function* mobile(params, JSESSIONID, sid) {
  if (typeof(params.data) === 'object') {
    params.data = JSON.stringify(params.data);
  }
  let method = params.type || 'POST';
  let formData = {
    api: params.api,
    v: params.v || '1.0',
    t: Date.now(),
    data: params.data,
    s: md5(params.data),
    sid: sid || ''
  };
  let coParams = {
    uri: global.apiRoot + '/api/mobile',
    method: method,
    encoding: 'utf8'
  };
  if (JSESSIONID) {
    coParams.headers = {
      Cookie: 'JSESSIONID=' + JSESSIONID
    }
  }

  if (method === 'GET') {
    coParams.qs = formData;
  } else {
    // coParams.body = params;
    // coParams.json = true;
    coParams.form = formData;
  }

  console.log(['====' + new Date().toLocaleTimeString() + '====[api request]', JSON.stringify(coParams)].join('\n'));

  let ret = yield coRequest(coParams);

  return ajaxDoneHandler(ret);
}

export function* rsa(JSESSIONID) {
  let ret = yield coRequest({
    uri: global.apiRoot + '/common/rsa',
    method: 'GET',
    headers: {
      Cookie: 'JSESSIONID=' + JSESSIONID
    },
    encoding: 'utf8'
  });
  return ajaxDoneHandler(ret);
}

export function * captchaVerify(params, JSESSIONID) {
  let data = JSON.parse(params.data);
  let ret = yield coRequest({
    uri: global.apiRoot + '/common/captcha/verify?captcha=' + data.captcha,
    method: 'GET',
    encoding: 'utf8',
    headers: {
      Cookie: 'JSESSIONID=' + JSESSIONID
    }
  });

  return ajaxDoneHandler(ret);
}
