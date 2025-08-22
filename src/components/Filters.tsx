import React from "react";
import { useSearchParams } from "react-router-dom";

export const Filters: React.FC = () => {
  const [sp, setSp] = useSearchParams();

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(sp);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSp(next, { replace: true });
  };

  return (
    <div className="d-flex flex-nowrap gap-2 mb-3 ">
      <select
        className="form-select"
        value={sp.get("status") || ""}
        onChange={(e) => update("status", e.target.value)}
      >
        <option value="">Status: Any</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        className="form-select"
        value={sp.get("gender") || ""}
        onChange={(e) => update("gender", e.target.value)}
      >
        <option value="">Gender: Any</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        className="form-select"
        value={sp.get("sort") || "asc"}
        onChange={(e) => update("sort", e.target.value)}
        aria-label="Sort by name"
      >
        <option value="asc">Sort: Name (A → Z)</option>
        <option value="desc">Sort: Name (Z → A)</option>
      </select>
    </div>
  );
};
