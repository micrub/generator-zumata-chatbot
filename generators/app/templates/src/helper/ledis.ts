// @ts-check

/** Setting up */
const lru = new Map();

/**
 * FIXME: Very simple LRU for caching user's session.
 * DO NOT USE IT IN PRODUCTION!.
 */
export const ledis = {
  size: lru.size,

  get: (key: string) => lru.get(key),
  set: (key: string, val: any) => lru.set(key, val),
  has: (key: string) => lru.has(key),
  delete: (key: string) => lru.delete(key),

  keys: () => lru.keys(),
  values: () => lru.values(),
  entries: () => lru.entries(),
  clear: () => lru.clear(),
};

export default ledis;
