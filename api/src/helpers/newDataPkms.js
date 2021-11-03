const { default: axios } = require("axios");

async function newDataPkms(api, atribute) {
  let pokemonsApi = api.map(async (pkmn) => {
    let pkmInfo;
    if (atribute) pkmInfo = await axios.get(pkmn[atribute].url);
    else pkmInfo = await axios.get(pkmn.url);

    return {
      id: pkmInfo.data.id,
      name: pkmInfo.data.name,
      life: pkmInfo.data.stats[0].base_stat,
      strength: pkmInfo.data.stats[1].base_stat,
      defense: pkmInfo.data.stats[2].base_stat,
      velocity: pkmInfo.data.stats[5].base_stat,
      height: pkmInfo.data.height,
      weight: pkmInfo.data.weight,
      type: pkmInfo.data.types,
      sprite: pkmInfo.data.sprites.front_default,
    };
  });

  return await Promise.all(pokemonsApi);
}

module.exports = {
  newDataPkms,
};
