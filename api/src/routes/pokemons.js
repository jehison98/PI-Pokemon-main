const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Pokemon, Type } = require("../db");
const { getPkmData } = require("../helpers/getPkmData");
const { getPkmnByName } = require("../helpers/getPokemons");
const { allPkms } = require("../helpers/allPkms");
const { apiUrl } = require("../apiUrl");

router.get("/", async (req, res, next) => {
  let { offset, name } = req.query;
  const limit = 10;
  let pkmUrl = `${apiUrl}?limit=${limit}`;

  try {
    if (name) {
      res.json(await getPkmnByName(name, apiUrl));
    } else {
      if (offset) {
        pkmUrl = `${apiUrl}?limit=${limit}&offset=${offset}`;
      }
      const pokemonAPI = await axios.get(pkmUrl);
      const allPokemons = await allPkms(
        pokemonAPI.data.results,
        limit,
        parseInt(offset),
        pokemonAPI.data.count
      );
      res.json(allPokemons);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const pokemonAPI = await axios.get(apiUrl);
  const count = pokemonAPI.data.count;
  let { id } = req.params;
  id = parseInt(id);
  try {
    if (id > count) {
      const pokemon = await Pokemon.findOne({
        where: {
          id,
        },
        include: Type,
      });
      if (pokemon) res.json(pokemon);
      else res.sendStatus(404);
    } else {
      const pokemon = await axios.get(`${apiUrl}/${id}`);
      if (getPkmData(pokemon.data)) res.json(getPkmData(pokemon.data));
      else res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  let { name, life, strength, defense, velocity, height, weight } = req.body;
  name = name.toLowerCase();
  let pkmnExist = false;
  try {
    const pokemon = await axios.get(`${apiUrl}/${name}`);
    if (pokemon) pkmnExist = true;
  } catch (err) {
    pkmnExist = false;
  }

  try {
    if (!pkmnExist) {
      console.log(Pokemon);
      const [newPokemon, created] = await Pokemon.findOrCreate({
        where: { name },
        defaults: {
          name,
          life,
          strength,
          defense,
          velocity,
          height,
          weight,
        },
      });
      if (created) {
        res.send(newPokemon);
      } else {
        res.send("Pokemon already exists");
      }
    } else {
      res.send("Pokemon alredy exists");
    }
  } catch (err) {
    next(err); //if error exists go to the next middleware (Error catching endware)
  }
});

router.post("/:pokemonId/type/:typeId", async (req, res, next) => {
  try {
    const { pokemonId, typeId } = req.params;
    const pokemon = await Pokemon.findByPk(pokemonId);
    await pokemon.addType(typeId);
    res.json(pokemon);
  } catch (err) {
    next(err);
  }
});

router.put("/", (req, res, next) => {
  res.send("I'm put from pokemons");
});

router.delete("/", (req, res, next) => {
  res.send("I'm delete from pokemons");
});

module.exports = router;
