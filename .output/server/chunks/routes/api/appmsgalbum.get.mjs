import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
import { p as proxyMpRequest } from '../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const appmsgalbum_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const fakeid = query.fakeid;
  const album_id = query.album_id;
  const isReverse = query.is_reverse || "0";
  const begin_msgid = query.begin_msgid;
  const begin_itemidx = query.begin_itemidx;
  const count = query.count || 20;
  const params = {
    action: "getalbum",
    __biz: fakeid,
    album_id,
    begin_msgid,
    begin_itemidx,
    count,
    is_reverse: isReverse,
    f: "json"
  };
  return proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/mp/appmsgalbum",
    query: params,
    parseJson: true
  });
});

export { appmsgalbum_get as default };
//# sourceMappingURL=appmsgalbum.get.mjs.map
