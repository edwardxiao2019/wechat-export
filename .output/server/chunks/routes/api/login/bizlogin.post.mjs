import { d as defineEventHandler } from '../../../runtime.mjs';
import { p as proxyMpRequest } from '../../../_/index.mjs';
import { u as useKv } from '../../../_/kv.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';

async function createUser(user) {
  const primaryKey = ["users", user.originalID];
  const byFakeIDKey = ["users_by_fakeid", user.fakeid];
  const byUuidKey = ["users_by_uuid", user.uuid];
  const kv = await useKv();
  const res = await kv.atomic().check({ key: primaryKey, versionstamp: null }).set(primaryKey, user).set(byFakeIDKey, user.originalID).set(byUuidKey, user.originalID).commit();
  return !!res.ok;
}
async function getUser(originalID) {
  const kv = await useKv();
  const { value: user } = await kv.get(["users", originalID]);
  return user;
}

const bizlogin_post = defineEventHandler(async (event) => {
  const body = {
    userlang: "zh_CN",
    redirect_url: "",
    cookie_forbidden: 0,
    cookie_cleaned: 0,
    plugin_used: 0,
    login_type: 3,
    token: "",
    lang: "zh_CN",
    f: "json",
    ajax: 1
  };
  const response = await proxyMpRequest({
    event,
    method: "POST",
    endpoint: "https://mp.weixin.qq.com/cgi-bin/bizlogin",
    query: {
      action: "login"
    },
    body
  });
  const cookies = response.headers.getSetCookie();
  const parsedCookies = parseCookies(cookies);
  const _body = await response.json();
  const _token = new URL(`http://localhost${_body.redirect_url}`).searchParams.get("token");
  const _cookie = [];
  Object.keys(parsedCookies).forEach((key) => {
    _cookie.push(key + "=" + parsedCookies[key].value);
  });
  const { nick_name, head_img } = await $fetch(`/api/login/info?token=${_token}`, {
    headers: {
      Cookie: _cookie.join(";")
    }
  });
  if (!nick_name) {
    return {
      err: "\u8BF7\u9009\u62E9\u516C\u4F17\u53F7\u767B\u5F55"
    };
  }
  const searchResult = await $fetch(`/api/searchbiz?token=${_token}&keyword=${nick_name}`, {
    headers: {
      Cookie: _cookie.join(";")
    }
  });
  let _fakeid = "";
  let _avatar = head_img;
  if (searchResult && searchResult.base_resp && searchResult.base_resp.ret === 0) {
    const account = searchResult.list.find((account2) => account2.nickname === nick_name);
    if (account) {
      _fakeid = account.fakeid;
      _avatar = account.round_head_img;
    }
  }
  const slave_user_cookie = parsedCookies["slave_user"];
  if (!slave_user_cookie) {
    return {
      err: "\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
    };
  }
  let user = await getUser(slave_user_cookie.value);
  if (!user) {
    user = {
      uuid: crypto.randomUUID(),
      fakeid: _fakeid,
      originalID: slave_user_cookie.value,
      nickname: nick_name,
      avatar: _avatar,
      createdAt: Date.now()
    };
    if (await createUser(user)) {
      console.log(`\u65B0\u7528\u6237(${user.nickname}:${user.uuid})\u521B\u5EFA\u6210\u529F`);
    } else {
      console.warn(`\u65B0\u7528\u6237(${user.nickname}:${user.uuid})\u521B\u5EFA\u5931\u8D25`);
    }
  }
  const newBody = JSON.stringify({
    uuid: user.uuid,
    nickname: user.nickname,
    avatar: user.avatar,
    fakeid: user.fakeid,
    token: _token,
    expires: slave_user_cookie.expires
  });
  const headers = new Headers(response.headers);
  headers.set("Content-Length", new TextEncoder().encode(newBody).length.toString());
  return new Response(newBody, { headers });
});
function parseCookies(cookies) {
  const result = {};
  cookies.forEach((cookie) => {
    const parts = cookie.split(";").map((v) => v.trim());
    const [name, value] = parts[0].split("=");
    const other = parts.slice(1).map((v) => v.toLowerCase());
    const pathPart = other.find((part) => part.startsWith("path="));
    const expirePart = other.find((part) => part.startsWith("expires="));
    result[name] = {
      name,
      value,
      path: (pathPart == null ? void 0 : pathPart.split("=")[1]) || "/",
      expires: (expirePart == null ? void 0 : expirePart.split("=")[1]) || "",
      secure: other.includes("secure"),
      httpOnly: other.includes("httponly")
    };
  });
  return result;
}

export { bizlogin_post as default };
//# sourceMappingURL=bizlogin.post.mjs.map
