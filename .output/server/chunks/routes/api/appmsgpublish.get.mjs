import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
import { p as proxyMpRequest } from '../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const appmsgpublish_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;
  const keyword = query.keyword;
  const token = query.token;
  const begin = query.begin || 0;
  const size = query.size || 5;
  const isSearching = !!keyword;
  const params = {
    sub: isSearching ? "search" : "list",
    search_field: isSearching ? "7" : "null",
    begin,
    count: size,
    query: keyword,
    fakeid: id,
    type: "101_1",
    free_publish_type: 1,
    sub_action: "list_ex",
    token,
    lang: "zh_CN",
    f: "json",
    ajax: 1
  };
  return proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/appmsgpublish",
    query: params,
    parseJson: true
  });
});

export { appmsgpublish_get as default };
//# sourceMappingURL=appmsgpublish.get.mjs.map
