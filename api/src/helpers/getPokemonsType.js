function getPokemonsType(data) {
  const results = data.map((pokemon) => pokemon.pokemon);
  return results;
}

module.exports = { getPokemonsType };
