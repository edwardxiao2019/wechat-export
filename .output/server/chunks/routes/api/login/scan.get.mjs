import { d as defineEventHandler } from '../../../runtime.mjs';
import { p as proxyMpRequest } from '../../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const scan_get = defineEventHandler(async (event) => {
  return proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/scanloginqrcode",
    query: {
      action: "ask",
      token: "",
      lang: "zh_CN",
      f: "json",
      ajax: 1
    }
  });
});

export { scan_get as default };
//# sourceMappingURL=scan.get.mjs.map
