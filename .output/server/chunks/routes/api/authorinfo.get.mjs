import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
import { p as proxyMpRequest } from '../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const authorinfo_get = defineEventHandler(async (event) => {
  const { biz } = getQuery(event);
  const params = {
    wxtoken: "777",
    biz,
    __biz: biz,
    x5: 0,
    f: "json"
  };
  return proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/mp/authorinfo",
    query: params,
    parseJson: true
  });
});

export { authorinfo_get as default };
//# sourceMappingURL=authorinfo.get.mjs.map
