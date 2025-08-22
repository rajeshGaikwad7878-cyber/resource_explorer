import { useState, useEffect, useCallback } from "react";

const KEY = "rm-favorites-v1";

export function useFavorites() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setIds(raw ? JSON.parse(raw) : []);
    } catch {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {}
  }, [ids]);

  const toggle = useCallback((id: number) => {
    setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const isFavorite = useCallback((id: number) => ids.includes(id), [ids]);

  return { ids, toggle, isFavorite };
}
