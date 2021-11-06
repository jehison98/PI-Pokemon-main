import React from "react";
import { Pokemon } from "./Pokemon/Pokemon";
import "./pokemons.css";

export function Pokemons({ pokemons }) {
  return (
    <ul className="pokemons-list">
      {pokemons.pokemons &&
        pokemons.pokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
    </ul>
  );
}
