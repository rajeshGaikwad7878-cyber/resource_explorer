export const getSearchParam = (sp: URLSearchParams, key: string) => {
  const v = sp.get(key);
  return v === null ? undefined : v;
};

export const setOrDelete = (
  sp: URLSearchParams,
  key: string,
  value: string | undefined | null
) => {
  if (value === undefined || value === null || value === "") sp.delete(key);
  else sp.set(key, value);
  return sp;
};
