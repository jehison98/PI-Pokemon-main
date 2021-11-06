import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPokemons,
  getTypes,
  getPokemonTypes,
  getDbPokemons,
  getPokemonId,
} from "../../actions/index";
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

  const [pagination, setPagination] = useState({
    page: 0,
    pages: 0,
    isTypes: false,
  });

  const [checked, setChecked] = useState([]);
  const [dbChecked, setDbChecked] = useState(false);
  const [select, setSelected] = useState({ value: "pokedex" });
  const [filter, setFilter] = useState({ name: "default", args: [] });
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTypes();
    getPokemons(0);
  }, [getTypes, getPokemons]);

  useEffect(() => {
    if (pokemons.count) {
      const pages = Math.ceil(pokemons.count / 20);
      setPagination((pagination) => ({ ...pagination, pages }));
    }
  }, [pokemons.count]);

  function selectFilter(event) {
    setSelected({ value: event.target.value });
  }

  function typeToggle(value) {
    setDbChecked(false);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      if (newChecked.length > 1) newChecked.shift();
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    if (newChecked.length > 0) {
      setFilter({ name: "type", args: newChecked });
      const pages = Math.ceil(pokemons.count / 20);
      setPagination({ page: 0, pages, isTypes: true });
    }
  }

  function pokemonsDB() {
    setChecked([]);
    setDbChecked(true);
    setFilter({ ...filter, name: "pokemonDB" });
  }

  function applyFilters(event) {
    event.preventDefault();
    if (filter.name === "type") getPokemonTypes(filter.args, 0, select.value);
    else if (filter.name === "pokemonDB") getDbPokemons(select.value);
  }

  function funcPagination(num) {
    if (num < 0 || num > pagination.pages - 1) return false;
    if (pagination.isTypes) {
      getPokemonTypes(checked, num * 20, select.value);
    } else {
      getPokemons(num * 20);
    }
    setPagination({ ...pagination, page: num });
  }

  function handleChanges(event) {
    setSearch(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    getPokemonId(search);
    setSearch("");
  }

  return (
    <div id="search">
      <h1>Search Component</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChanges} />
        <button type="submit">Search</button>
      </form>

      <select value={select.value} onChange={selectFilter}>
        <option value="pokedex">Pokedex</option>
        <option value="nameAZ">Name: A - Z</option>
        <option value="nameZA">Name: Z - A</option>
        <option value="strengthAsc">Strength +</option>
        <option value="strengthDes">Strength -</option>
      </select>

      <form onSubmit={applyFilters}>
        <label>
          Created By Me
          <input type="checkbox" onChange={pokemonsDB} checked={dbChecked} />
        </label>
        {types &&
          types.map((type) => (
            <label key={type.id}>
              {type.name}
              <input
                type="checkbox"
                onChange={() => typeToggle(type.name)}
                checked={checked.indexOf(type.name) === -1 ? false : true}
              />
            </label>
          ))}
        <button type="submit">Apply</button>
      </form>

      <div>
        <button onClick={() => funcPagination(0)}>First</button>
        <button onClick={() => funcPagination(pagination.page - 1)}>
          Prev
        </button>
        <button onClick={() => funcPagination(pagination.page + 1)}>
          Next
        </button>
        <button onClick={() => funcPagination(pagination.pages - 1)}>
          Last
        </button>
      </div>

      {pokemons.hasOwnProperty("pokemons") ? (
        <ol>
          {pokemons.pokemons &&
            pokemons.pokemons.map((pokemon) => (
              <li key={pokemon.id}>
                {pokemon.name}
                <img src={pokemon.sprite} alt={pokemon.name} />
              </li>
            ))}
        </ol>
      ) : (
        <div>
          {pokemons.name}
          <img src={pokemons.sprite} alt={pokemons.name} />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pokemons: state.pokemons,
    types: state.types,
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
