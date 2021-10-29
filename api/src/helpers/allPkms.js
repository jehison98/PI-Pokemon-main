const { newDataPkms } = require("./newDataPkms");
const { mixDbApi } = require("./mixDbApi");

async function allPkms(pokemonAPI, limit, offset) {
  return await newDataPkms(pokemonAPI).then(async (result) => {
    if (result.length < limit) {
      let pkmDbResult = await mixDbApi(
        result,
        limit,
        offset,
        pokemonAPI.data.count
      );
      const allPokemons = [...result, ...pkmDbResult];
      return allPokemons;
    } else {
      console.log("else");
      return result;
    }
  });
}
 
module.exports = {
  allPkms,
};
