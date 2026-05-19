import { d as defineEventHandler } from '../../../runtime.mjs';
import { p as proxyMpRequest } from '../../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const getqrcode_get = defineEventHandler(async (event) => {
  return proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/scanloginqrcode",
    query: {
      action: "getqrcode",
      random: (/* @__PURE__ */ new Date()).getTime()
    }
  });
});

export { getqrcode_get as default };
//# sourceMappingURL=getqrcode.get.mjs.map
