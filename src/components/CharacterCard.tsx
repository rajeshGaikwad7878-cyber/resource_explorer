import React from "react";
import { Link } from "react-router-dom";
import { Character } from "../types";

type Props = {
  c: Character;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export const CharacterCard: React.FC<Props> = ({ c, isFavorite, onToggleFavorite }) => {
  return (
    <div className="card" style={{ width: "21rem" }}>
      <Link to={`/characters/${c.id}`}>
        <img src={c.image} className="card-img-top" alt={c.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          {c.name}
          <button
            onClick={() => onToggleFavorite(c.id)}
            className="btn btn-sm btn-outline-warning"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </h5>
        <p className="card-text small mb-1">
  <span className={`badge bg-${c.status === "Alive" ? "success" : c.status === "Dead" ? "danger" : "secondary"} me-2`}>
    {c.status}
  </span>
  {c.species} • {c.gender}
</p>
<p className="card-text small text-muted">📍 {c.location.name}</p>

      </div>
    </div>
  );
};

export const CharacterCardSkeleton: React.FC = () => (
  <div className="card placeholder-wave" style={{ width: "18rem" }}>
    <div className="card-img-top placeholder" style={{ height: "180px" }}></div>
    <div className="card-body">
      <h5 className="card-title placeholder col-8"></h5>
      <p className="card-text placeholder col-6"></p>
    </div>
  </div>
);
