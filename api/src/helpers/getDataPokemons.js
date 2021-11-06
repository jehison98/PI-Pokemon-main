const { default: axios } = require("axios");

async function getDataPokemons(data) {
  if (Array.isArray(data)) {
    const results = data.map(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      return {
        id: pokemonData.data.id,
        name: pokemonData.data.name,
        life: pokemonData.data.stats[0].base_stat,
        strength: pokemonData.data.stats[1].base_stat,
        defense: pokemonData.data.stats[2].base_stat,
        velocity: pokemonData.data.stats[5].base_stat,
        height: pokemonData.data.height,
        weight: pokemonData.data.weight,
        types: pokemonData.data.types,
        sprite: pokemonData.data.sprites.front_default,
      };
    });
    return Promise.all(results);
  }
  return {
    id: data.id,
    name: data.name,
    life: data.stats[0].base_stat,
    strength: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    velocity: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    types: data.types,
    sprite: data.sprites.front_default,
  };
}

module.exports = { getDataPokemons };
