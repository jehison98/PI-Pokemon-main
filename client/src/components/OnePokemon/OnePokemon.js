import React from "react";

export function OnePokemon({ pokemon }) {
  return (
    <>
      <li>
        {pokemon.name}
        <img src={pokemon.sprite} alt={pokemon.name} />
      </li>
    </>
  );
}
