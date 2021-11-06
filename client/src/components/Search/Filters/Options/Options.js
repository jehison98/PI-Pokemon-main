import React from "react";
import "./options.css";

export function Options({ setSelect, select }) {
  function selectFilter(event) {
    setSelect(event.target.value);
  }

  return (
    <select id="select-options" value={select} onChange={selectFilter}>
      <option value="pokedex">Pokedex</option>
      <option value="nameAZ">Name: A - Z</option>
      <option value="nameZA">Name: Z - A</option>
      <option value="strengthAsc">Strength +</option>
      <option value="strengthDes">Strength -</option>
    </select>
  );
}
