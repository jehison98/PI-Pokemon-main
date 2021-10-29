const axios = require("axios");
const apiUrl = "https://pokeapi.co/api/v2/type";

async function saveApiTypes(Type) {
  try {
    const apiTypes = await axios.get(apiUrl);
    apiTypes.data.results.forEach(async (type) => {
      const name = type.name;
      const theType = Type.build({
        name,
      });
      await theType.save();
    });
  } catch (err) {
    console.log(err);
  }
  console.log("types created");
}

module.exports = {
  saveApiTypes,
};
