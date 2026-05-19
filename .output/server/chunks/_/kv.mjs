import { c as createError } from '../runtime.mjs';

const useKv = async () => {
  if (globalThis.Deno) {
    return globalThis.Deno.openKv();
  }
  throw createError({
    statusCode: 500,
    message: "Could not find a Deno KV for production, make sure to deploy on Deno Deploy."
  });
};

export { useKv as u };
//# sourceMappingURL=kv.mjs.map
