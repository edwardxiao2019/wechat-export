import { d as defineEventHandler } from '../../../../runtime.mjs';
import { p as proxyMpRequest } from '../../../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const _sessionid__post = defineEventHandler(async (event) => {
  const { sessionid } = event.context.params;
  const body = {
    userlang: "zh_CN",
    redirect_url: "",
    login_type: 3,
    sessionid,
    token: "",
    lang: "zh_CN",
    f: "json",
    ajax: 1
  };
  return proxyMpRequest({
    event,
    method: "POST",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/bizlogin",
    query: {
      action: "startlogin"
    },
    body
  });
});

export { _sessionid__post as default };
//# sourceMappingURL=_sessionid_.post.mjs.map
