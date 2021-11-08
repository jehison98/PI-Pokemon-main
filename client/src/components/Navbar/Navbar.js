import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  return (
    <nav id="navbar">
      <ul>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink exact to="/search" activeClassName="active">
          Search
        </NavLink>
        <NavLink exact to="/pokemon/create" activeClassName="active">
          Create
        </NavLink>
      </ul>
    </nav>
  );
}
