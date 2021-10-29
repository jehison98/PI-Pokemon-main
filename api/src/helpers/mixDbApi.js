const { Pokemon, Type } = require("../db");

async function mixDbApi(result, limit, offset, apiCount) {
  const lim = limit - result.length;
  let theOffset = 0;
  if (result.length === 0) theOffset = offset - apiCount;
  const pokemonDB = await Pokemon.findAll({
    include: Type,
    offset: theOffset,
    limit: lim,
    order: [["id", "ASC"]],
  });

  return await Promise.all(pokemonDB);
}

module.exports = {
  mixDbApi,
};
