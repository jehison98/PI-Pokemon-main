import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/pokemon_logo.png";
import "./home.css";
import "../../Animations.css";

export function Home() {
  return (
    <div id="home">
      <div className="home-content">
        <img src={logo} alt="logo" className="slide-down" />
        <Link to="/search" className="btn-home fade-in">
          Click me to start
        </Link>
      </div>
    </div>
  );
}
