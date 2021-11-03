const { Pokemon } = require("../db");

async function countPokemons(apiCount) {
  const pokemonDB = await Pokemon.findAll();
  return pokemonDB.length + apiCount;
}

module.exports = {
  countPokemons,
};
