const { Pokemon, Type } = require("../db");

async function typesDbPokemons(id) {
  const allData = await Pokemon.findAll({
    include: [
      {
        model: Type,
        where: { id },
      },
    ],
  });
  const idPkms = allData.map((pkmnId) => pkmnId.id);
  const pkmsByType = await Pokemon.findAll({
    where: {
      id: idPkms,
    },
    include: [
      {
        model: Type,
      },
    ],
  });

  return pkmsByType;
}

module.exports = {
  typesDbPokemons,
};
