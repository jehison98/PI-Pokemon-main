const axios = require("axios");
const { Pokemon } = require("../db");
const { getPkmData } = require("./getPkmData");

async function getPkmnByName(name, apiUrl) {
  name = name.toLocaleLowerCase();
  const pokemon = await Pokemon.findOne({
    where: {
      name,
    },
  });
  if (pokemon) return pokemon;
  else {
    const pokemonData = await axios.get(`${apiUrl}/${name}`);
    return getPkmData(pokemonData.data);
  }
}

module.exports = {
  getPkmnByName,
};
