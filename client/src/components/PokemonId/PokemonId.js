import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPokemon } from "../../actions/index";
import "./pokemon.css";

function PokemonId(props) {
  const { getPokemon, pokemon } = props;
  const id = props.match.params.id;
  useEffect(() => {
    getPokemon(id);
  }, [getPokemon, id]);

  return (
    <div id="the-pokemon" className="container">
      <h1>{pokemon.name}</h1>
      <div id="pokemon-info">
        <div className="pokemon-element">
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
            <h5>N.º{pokemon.id}</h5>
            <div className="pokemon-types">
              {pokemon.types &&
                pokemon.types.map((type, index) => (
                  <span className={`type ${type.name}`} key={index}>
                    {type.name}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="aditional-info">
          <h3>Stats</h3>
          <ul className="stats">
            <li>Life: {pokemon.life}</li>
            <li>Attack: {pokemon.strength}</li>
            <li>Defense: {pokemon.defense}</li>
            <li>Speed: {pokemon.velocity}</li>
          </ul>
          <div className="height-weight">
            <span>Height: {pokemon.height}</span>
            <span>Weight: {pokemon.weight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemon: state.pokemons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemon: (id) => dispatch(getPokemon(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonId);
