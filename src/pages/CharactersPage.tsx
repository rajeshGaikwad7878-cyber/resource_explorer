import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCharacters } from "../api/rickAndMorty";
import { Character } from "../types";
import { CharacterCard, CharacterCardSkeleton } from "../components/CharacterCard";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { useFavorites } from "../hooks/useFavorites";

const SCROLL_KEY = "characters-scrollY";

export const CharactersPage: React.FC = () => {
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const name = sp.get("name") || undefined;
  const status = sp.get("status") || undefined;
  const gender = sp.get("gender") || undefined;
  const sort = sp.get("sort") || "asc";
  const favOnly = sp.get("favorites") === "true";

  const [characters, setCharacters] = useState<Character[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ids, toggle, isFavorite } = useFavorites();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    setError(null);

    fetchCharacters({ page, name, status, gender }, ac.signal)
      .then(res => {
        setCharacters(res.results);
        setPages(res.info.pages);
        const y = sessionStorage.getItem(SCROLL_KEY);
        if (y) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: Number(y) });
            sessionStorage.removeItem(SCROLL_KEY);
          });
        }
      })
      .catch(e => { if (!ac.signal.aborted) setError(e.message); })
      .finally(() => setLoading(false));

    return () => ac.abort();
  }, [page, name, status, gender]);

  const filtered = useMemo(() => {
    let list = characters;
    if (favOnly) list = list.filter(c => ids.includes(c.id));
    list = [...list].sort((a, b) =>
      sort === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return list;
  }, [characters, favOnly, ids, sort]);

  const goToPage = (n: number) => {
    const next = new URLSearchParams(sp);
    next.set("page", String(n));
    setSp(next, { replace: true });
  };

  return (
    <section>
      <SearchBar />
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="favoritesOnly"
          checked={favOnly}
          onChange={(e) => {
            const next = new URLSearchParams(sp);
            if (e.target.checked) next.set("favorites", "true");
            else next.delete("favorites");
            setSp(next, { replace: true });
          }}
        />
        <label htmlFor="favoritesOnly" className="form-check-label">Favorites only</label>
      </div>

      {loading && (
        <div className="d-flex flex-wrap gap-4 mt-4 justify-content-between">
          {Array.from({ length: 9 }).map((_, i) => <CharacterCardSkeleton key={i} />)}
        </div>
      )}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && !error && (
        <div className="d-flex flex-wrap gap-4 mt-4 justify-content-between">
          {filtered.map((c) => (
            <CharacterCard
              key={c.id}
              c={c}
              isFavorite={isFavorite(c.id)}
              onToggleFavorite={toggle}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-muted">No results. Try changing filters or search.</p>
          )}
        </div>
      )}

     <nav className="mt-4">
  <ul className="pagination justify-content-center">
    
    <li className={`page-item ${page === 1 ? "disabled" : ""} `}>
      <button className="page-link" onClick={() => goToPage(page - 1)}>
        Previous
      </button>
    </li>

    {(() => {
      const maxVisible = 7;
      let start = Math.max(1, page - Math.floor(maxVisible / 2));
      let end = start + maxVisible - 1;

      if (end > pages) {
        end = pages;
        start = Math.max(1, end - maxVisible + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
        <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
          <button className="page-link" onClick={() => goToPage(p)}>
            {p}
          </button>
        </li>
      ));
    })()}

    <li className={`page-item ${page === pages ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => goToPage(page + 1)}>
        Next
      </button>
    </li>
  </ul>
</nav>

    </section>
  );
};
