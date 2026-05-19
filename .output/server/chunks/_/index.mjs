import { p as parseCookies } from '../runtime.mjs';

async function proxyMpRequest(options) {
  const cookies = parseCookies(options.event);
  const cookie = Object.keys(cookies).map((key) => `${key}=${cookies[key]}`).join(";");
  if (options.withCredentials === void 0) {
    options.withCredentials = true;
  }
  const fetchInit = {
    method: options.method,
    headers: {
      Referer: "https://mp.weixin.qq.com/",
      Origin: "https://mp.weixin.qq.com",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
      Cookie: options.withCredentials ? cookie : ""
    }
  };
  if (options.query) {
    options.endpoint += "?" + new URLSearchParams(options.query).toString();
  }
  if (options.method === "POST" && options.body) {
    fetchInit.body = new URLSearchParams(options.body).toString();
  }
  const response = fetch(options.endpoint, fetchInit);
  if (!options.parseJson) {
    return response;
  } else {
    return response.then((resp) => resp.json());
  }
}

export { proxyMpRequest as p };
//# sourceMappingURL=index.mjs.map
