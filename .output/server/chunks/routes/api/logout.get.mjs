import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
import { p as proxyMpRequest } from '../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const logout_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const response = await proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/logout",
    query: {
      t: "wxm-logout",
      token: query.token,
      lang: "zh_CN"
    }
  });
  return {
    statusCode: response.status,
    statusText: response.statusText
  };
});

export { logout_get as default };
//# sourceMappingURL=logout.get.mjs.map
