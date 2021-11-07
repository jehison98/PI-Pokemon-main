import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPokemons,
  getTypes,
  getPokemonTypes,
  getDbPokemons,
  getPokemonId,
} from "../../actions/index";

import { Input } from "./Input/Input";
import { Filters } from "./Filters/Filters";
import { Pagination } from "./Pagination/Pagination";
import { Pokemons } from "./Pokemons/Pokemons";
import { Pokemon } from "./Pokemons/Pokemon/Pokemon";
import "./search.css";

function Search(props) {
  const {
    getPokemons,
    pokemons,
    getTypes,
    types,
    getPokemonTypes,
    getDbPokemons,
    getPokemonId,
  } = props;

  const [checkbox, setCheckBox] = useState([]);
  const [select, setSelect] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    pages: 0,
    filterState: 0,
  });

  useEffect(() => {
    getTypes();
    getPokemons(0);
  }, [getTypes, getPokemons]);

  return (
    <div id="search">
      <h1>Search a Pokemon</h1>
      <Input getPokemonId={getPokemonId} />
      <div id="search-content">
        <div className="sidebar">
          <Filters
            types={types}
            getDbPokemons={getDbPokemons}
            getPokemonTypes={getPokemonTypes}
            pokemonsCount={pokemons.count}
            setPagination={setPagination}
            setCheckBox={setCheckBox}
            setSelect={setSelect}
            select={select}
          />
        </div>

        <div className="content">
          {pokemons && pokemons.hasOwnProperty("pokemons") ? (
            <>
              <Pokemons pokemons={pokemons} />
              {pokemons.pokemons.length > 0 ? (
                <Pagination
                  count={pokemons.count}
                  getPokemons={getPokemons}
                  getPokemonTypes={getPokemonTypes}
                  pagination={pagination}
                  setPagination={setPagination}
                  select={select}
                  checkbox={checkbox}
                />
              ) : (
                false
              )}
            </>
          ) : (
            <Pokemon pokemon={pokemons} />
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    types: state.types,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPokemons: (offset) => dispatch(getPokemons(offset)),
    getPokemonId: (name) => dispatch(getPokemonId(name)),
    getTypes: () => dispatch(getTypes()),
    getPokemonTypes: (types, offset, order) =>
      dispatch(getPokemonTypes(types, offset, order)),
    getDbPokemons: (order) => dispatch(getDbPokemons(order)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
