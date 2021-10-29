const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Pokemon } = require("../db");
const { getPkmData } = require("../helpers/getPkmData");
const { getPkmnByName } = require("../helpers/getPokemons");
const { allPkms } = require("../helpers/allPkms");

const apiUrl = "https://pokeapi.co/api/v2/pokemon";
router.get("/", async (req, res, next) => {
  let { offset, name } = req.query;
  const limit = 10;
  let pkmUrl = `${apiUrl}?limit=${limit}`;

  try {
    if (name) {
      res.send(await getPkmnByName(name, apiUrl));
    } else {
      if (offset) {
        pkmUrl = `${apiUrl}?limit=${limit}&offset=${offset}`;
      }
      const pokemonAPI = await axios.get(pkmUrl);
      const allPokemons = await allPkms(pokemonAPI, limit, parseInt(offset));
      res.send(allPokemons);
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
      const pokemon = await Pokemon.findByPk(id);
      if (pokemon) res.send(pokemon);
      else res.sendStatus(404);
    } else {
      const pokemon = await axios.get(`${apiUrl}/${id}`);
      if (getPkmData(pokemon.data)) res.send(getPkmData(pokemon.data));
      else res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name, life, strength, defense, velocity, height, weight } = req.body;
  try {
    const newPokemon = await Pokemon.create({
      name,
      life,
      strength,
      defense,
      velocity,
      height,
      weight,
    });
    res.status(201).send(newPokemon);
  } catch (err) {
    next(err); //if error exists go to the next middleware (Error catching endware)
  }
});

router.post("/:pokemonId/type/:typeId", async (req, res, next) => {
  try {
    const { pokemonId, typeId } = req.params;
    const pokemon = await Pokemon.findByPk(pokemonId);
    await pokemon.addType(typeId);
    res.sendStatus(200);
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
