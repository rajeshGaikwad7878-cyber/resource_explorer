import type { Character, PagedResponse } from "../types";

const BASE = "https://rickandmortyapi.com/api";

export type ListQuery = {
  page?: number;
  name?: string;
  status?: string;
  gender?: string;
};

export function buildCharactersUrl(q: ListQuery) {
  const url = new URL(`${BASE}/character`);
  if (q.page) url.searchParams.set("page", String(q.page));
  if (q.name) url.searchParams.set("name", q.name);
  if (q.status) url.searchParams.set("status", q.status);
  if (q.gender) url.searchParams.set("gender", q.gender);
  return url.toString();
}

export async function fetchCharacters(
  q: ListQuery,
  signal?: AbortSignal
): Promise<PagedResponse<Character>> {
  const res = await fetch(buildCharactersUrl(q), { signal });
  if (!res.ok) {
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchCharacter(
  id: string | number,
  signal?: AbortSignal
): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`, { signal });
  if (!res.ok) throw new Error("Character not found");
  return res.json();
}
