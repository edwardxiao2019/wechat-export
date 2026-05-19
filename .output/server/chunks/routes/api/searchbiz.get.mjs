import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
import { p as proxyMpRequest } from '../../_/index.mjs';
import { u as useKv } from '../../_/kv.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

async function getBizEntry(fakeid) {
  const kv = await useKv();
  const { value: bizEntry } = await kv.get(["biz", fakeid]);
  kv.close();
  return bizEntry;
}

const searchbiz_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const keyword = query.keyword;
  const token = query.token;
  const begin = query.begin || 0;
  const size = query.size || 5;
  if (/^[a-z0-9]+==$/i.test(keyword)) {
    const bizEntry = await getBizEntry(keyword);
    if (bizEntry) {
      return {
        base_resp: {
          ret: 0,
          err_msg: "ok"
        },
        list: [bizEntry],
        total: 1
      };
    }
  }
  const params = {
    action: "search_biz",
    begin,
    count: size,
    query: keyword,
    token,
    lang: "zh_CN",
    f: "json",
    ajax: "1"
  };
  return proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/searchbiz",
    query: params,
    parseJson: true
  });
});

export { searchbiz_get as default };
//# sourceMappingURL=searchbiz.get.mjs.map
