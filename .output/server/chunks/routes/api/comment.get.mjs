import { d as defineEventHandler, g as getQuery } from '../../runtime.mjs';
import { p as proxyMpRequest } from '../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const comment_get = defineEventHandler(async (event) => {
  const { __biz, comment_id, uin, key, pass_ticket } = getQuery(event);
  const params = {
    action: "getcomment",
    __biz,
    comment_id,
    uin,
    key,
    pass_ticket,
    limit: 1e3,
    f: "json"
  };
  const resp = await proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/mp/appmsg_comment",
    query: params,
    parseJson: false
  });
  return new Response(resp.body, {
    headers: {
      "content-type": "application/json"
    }
  });
});

export { comment_get as default };
//# sourceMappingURL=comment.get.mjs.map
