import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { Filters } from "./Filters";

export const SearchBar: React.FC = () => {
  const [sp, setSp] = useSearchParams();
  const [query, setQuery] = useState(sp.get("name") || "");
  const [isTyping, setIsTyping] = useState(false);
  const debounced = useDebouncedValue(query, 400);

  
  useEffect(() => {
    const next = new URLSearchParams(sp);
    if (debounced) next.set("name", debounced);
    else next.delete("name");
    next.delete("page");
    setSp(next, { replace: true });
    setIsTyping(false); 
  }, [debounced]);


  useEffect(() => {
    setQuery(sp.get("name") || "");
  }, [sp]);

  return (
    <div className="row mb-3 g-2">
      <div className="col-12 col-md-6">
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsTyping(true); 
            }}
            aria-label="Search characters by name"
          />
          {isTyping && (
            <span className="input-group-text bg-transparent border-0">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </span>
          )}
        </div>
      </div>

      
      <div className="col-12 col-md-6">
        <Filters />
      </div>
    </div>
  );
};
