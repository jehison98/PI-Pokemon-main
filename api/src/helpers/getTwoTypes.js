function getTwoTypes(name, pokemonArray) {
  const twoTypes = { count: 0, pokemons: [] };
  for (let i = 0; i < pokemonArray.length; i++) {
    const pokemon = pokemonArray[i];
    for (let j = 0; j < pokemon.types.length; j++) {
      const type = pokemon.types[j];
      if (type.name === name) {
        twoTypes.pokemons.push(pokemon);
        break;
      }
    }
  }
  twoTypes.count = twoTypes.pokemons.length;
  return twoTypes;
}

module.exports = { getTwoTypes };
