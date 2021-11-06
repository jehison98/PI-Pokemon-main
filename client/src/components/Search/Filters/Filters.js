import React, { useState } from "react";
import { Options } from "./Options/Options";
import { TypesBox } from "./TypesBox/TypesBox";
import "./filters.css";

export function Filters(props) {
  const {
    types,
    getDbPokemons,
    getPokemonTypes,
    pokemonsCount,
    setPagination,
    select,
  } = props;

  const [filter, setFilter] = useState({ name: "default", args: [] });

  function applyFilters(event) {
    event.preventDefault();
    if (filter.name === "type") getPokemonTypes(filter.args, 0, select);
    else if (filter.name === "pokemonDB") getDbPokemons(select);
  }

  return (
    <form id="form-filters" onSubmit={applyFilters}>
      <button className="btn" type="submit">
        Apply Changes
      </button>
      <h2>Order By</h2>
      <Options setSelect={props.setSelect} select={select} />
      <h2>Filter By Type</h2>
      <TypesBox
        setCheckBox={props.setCheckBox}
        setFilter={setFilter}
        filter={filter}
        types={types}
        pokemonsCount={pokemonsCount}
        setPagination={setPagination}
      />
    </form>
  );
}
