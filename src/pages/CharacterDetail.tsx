import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCharacter } from "../api/rickAndMorty";
import { Character } from "../types";
import { useFavorites } from "../hooks/useFavorites";

export const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCharacter(id)
      .then(setCharacter)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!character) return null;

  return (
    <div>
      <Link to="/" className="btn btn-link mb-3" onClick={() => {
        sessionStorage.setItem("characters-scrollY", String(window.scrollY));
      }}>← Back</Link>

      <div className="card mx-auto" style={{ maxWidth: "520px" }}>
        <img src={character.image} alt={character.name} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title d-flex justify-content-between align-items-center">
            {character.name}
            <button
              className="btn btn-sm btn-outline-warning"
              onClick={() => toggle(character.id)}
            >
              {isFavorite(character.id) ? "★" : "☆"}
            </button>
          </h3>
          <p>{character.status} - {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>
      </div>
    </div>
  );
};
