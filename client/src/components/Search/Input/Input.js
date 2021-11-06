import React, { useState } from "react";
import "./input.css";

export function Input({ getPokemonId }) {
  const [search, setSearch] = useState("");
  function handleChanges(event) {
    setSearch(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    getPokemonId(search);
    setSearch("");
  }
  return (
    <form id="search-input" onSubmit={handleSubmit}>
      <input type="text" value={search} onChange={handleChanges} />
      <button className="btn" type="submit">
        Search
      </button>
    </form>
  );
}
