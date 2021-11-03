import React from "react";

export function SearchInput({ getPokemonByName }) {
  const [state, setState] = React.useState({
    name: "",
  });

  const { name } = state;

  function handleChanges(event) {
    const name = event.target.value.trim();
    setState({ ...state, name: name });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (state.name !== "") getPokemonByName(state.name);
    setState({ name: "" });
  }

  return (
    <form id="search-pokemon-form" onSubmit={(e) => handleSubmit(e)}>
      <input value={name} name="pokemon" onChange={(e) => handleChanges(e)} />
      <button type="submit">Search</button>
    </form>
  );
}
