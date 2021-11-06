import React from "react";
import "./pokemon.css";
import "../../../../types.css";

export function Pokemon({ pokemon }) {
  return (
    <li className="pokemon-element">
      <div className="img-container">
        <img src={pokemon.sprite} alt={pokemon.name} />
      </div>

      <div className="pokemon-data">
        <span className="name">{pokemon.name}</span>
        <br />
        <div className="pokemon-types">
          {pokemon.types &&
            pokemon.types.map((type, index) => (
              <span className={`type ${type.type.name}`} key={index}>
                {type.type.name}
              </span>
            ))}
        </div>
      </div>
    </li>
  );
}
