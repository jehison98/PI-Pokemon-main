import React from "react";
import { Link } from "react-router-dom";
import "./pokemon.css";
import "../../../../types.css";

export function Pokemon({ pokemon }) {
  return (
    <Link className="pokemon-element" to={`/pokemon/search/${pokemon.id}`}>
      <li>
        <div className="img-container">
          {pokemon.sprite ? (
            <img src={pokemon.sprite} alt={pokemon.name} />
          ) : (
            <img
              src="https://mascolandia.com.ar//includes/productos/img/noimageb.png"
              alt={pokemon.name}
            />
          )}
        </div>

        <div className="pokemon-data">
          <span className="name">{pokemon.name}</span>
          <br />
          <div className="pokemon-types">
            {pokemon.types &&
              pokemon.types.map((type, index) => (
                <span className={`type ${type.name}`} key={index}>
                  {type.name}
                </span>
              ))}
          </div>
        </div>
      </li>
    </Link>
  );
}
