import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCount, getPokemons, getPokemonByName } from "../../actions/index";
import { OnePokemon } from "../OnePokemon/OnePokemon";
import { Pagination } from "../Pagination/Pagination";
import { Pokemons } from "../Pokemons/Pokemons";
import { SearchInput } from "../SearchInput/SearchInput";
import "./Pokemon.css";

function Pokemon(props) {
  const { getCount, getPokemons, pokemons, count, pokemon, getPokemonByName } =
    props;

  useEffect(() => {
    getPokemons(0);
    getCount();
  }, [getPokemons, getCount]);

  return (
    <div id="search-pokemon">
      <SearchInput getPokemonByName={getPokemonByName} />
      <form id="filters-form">
        <h3>Order By</h3>
        <select>
          <option value="pokedex">Number of pokedex</option>
          <option value="a-z">Name: A - Z</option>
          <option value="z-a">Name: Z - A</option>
          <option value="strongers+">Strongers +</option>
          <option value="strongers-">Strongers -</option>
        </select>

        <h3>Type</h3>
        <label>
          Normal
          <input name="normal" type="checkbox" />
        </label>
        <label>
          Poison
          <input name="poison" type="checkbox" />
        </label>
        <label>
          Fire
          <input name="fire" type="checkbox" />
        </label>
      </form>

      {!props.error ? (
        Object.keys(pokemon).length === 0 ? (
          <div>
            <Pagination getPokemons={getPokemons} count={count} />
            <Pokemons pokemons={pokemons} />
          </div>
        ) : (
          <OnePokemon pokemon={pokemon} />
        )
      ) : (
        <h2>Pokemons Not Found</h2>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    count: state.count,
    pokemon: state.pokemon,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons: (offset) => dispatch(getPokemons(offset)),
    getPokemonByName: (name) => dispatch(getPokemonByName(name)),
    getCount: () => dispatch(getCount()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
