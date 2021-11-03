function getPkmData(data) {
  return {
    id: data.id,
    name: data.name,
    life: data.stats[0].base_stat,
    strength: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    velocity: data.stats[5].base_stat,
    height: data.height,
    weight: data.weight,
    type: data.types,
    sprite: data.sprites.front_default,
  };
}
module.exports = {
  getPkmData,
};
