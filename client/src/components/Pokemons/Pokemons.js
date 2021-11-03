import React from "react";
import { OnePokemon } from "../OnePokemon/OnePokemon";

export function Pokemons({ pokemons }) {
  return (
    <ol>
      {pokemons &&
        pokemons.map((pokemon) => (
          <OnePokemon key={pokemon.id} pokemon={pokemon} />
        ))}
    </ol>
  );
}
