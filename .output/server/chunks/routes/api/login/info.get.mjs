import { d as defineEventHandler, g as getQuery } from '../../../runtime.mjs';
import { p as proxyMpRequest } from '../../../_/index.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

const info_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const html = await proxyMpRequest({
    event,
    method: "GET",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/home",
    query: {
      t: "home/index",
      token: query.token,
      lang: "zh_CN"
    }
  }).then((resp) => resp.text());
  let nick_name = "";
  const nicknameMatchResult = html.match(/wx\.cgiData\.nick_name\s*?=\s*?"(?<nick_name>[^"]+)"/);
  if (nicknameMatchResult && nicknameMatchResult.groups && nicknameMatchResult.groups.nick_name) {
    nick_name = nicknameMatchResult.groups.nick_name;
  }
  let head_img = "";
  const headImgMatchResult = html.match(/wx\.cgiData\.head_img\s*?=\s*?"(?<head_img>[^"]+)"/);
  if (headImgMatchResult && headImgMatchResult.groups && headImgMatchResult.groups.head_img) {
    head_img = headImgMatchResult.groups.head_img;
  }
  return {
    nick_name,
    head_img
  };
});

export { info_get as default };
//# sourceMappingURL=info.get.mjs.map
