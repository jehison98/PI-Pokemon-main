const { newDataPkms } = require("./newDataPkms");
const { mixDbApi } = require("./mixDbApi");

async function allPkms(pokemonAPI, limit, offset, count, atribute = null) {
  return await newDataPkms(pokemonAPI, atribute).then(async (result) => {
    if (result.length < limit) {
      let pkmDbResult = await mixDbApi(result, limit, offset, count);
      return [...result, ...pkmDbResult];
    } else {
      return result;
    }
  });
}

module.exports = {
  allPkms,
};
