const { Router } = require("express");
const router = Router();
const { default: axios } = require("axios");
const { Pokemon, Type } = require("../db");
const {
  getDataPokemons,
  getPokemonsType,
  getTwoTypes,
  orderPokemons,
} = require("../helpers/index");
const apiUrl = require("./apiUrl");

router.get("/", async (req, res, next) => {
  const { offset, name } = req.query;
  try {
    if (name) {
      const dbPokemon = await Pokemon.findOne({
        where: { name: name.toLocaleLowerCase() },
      });
      if (dbPokemon) res.json(dbPokemon);
      else {
        const pokemonName = await axios.get(
          `${apiUrl}/pokemon/${name.toLowerCase()}`
        );
        res.json(await getDataPokemons(pokemonName.data));
      }
    } else {
      const allPokemons = await axios.get(
        `${apiUrl}/pokemon?offset=${offset}&limit=20`
      );
      res.json({
        count: allPokemons.data.count,
        pokemons: await getDataPokemons(allPokemons.data.results),
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/pokemonTypes", async (req, res, next) => {
  const { nameOne, nameTwo, offset, limit, order } = req.query;
  const allTypes = await axios.get(`${apiUrl}/type`);
  try {
    if (nameOne) {
      const type = allTypes.data.results.find(
        (typeName) => typeName.name === nameOne
      );
      const pokemonsType = await axios.get(type.url);
      const flatPokemons = getPokemonsType(pokemonsType.data.pokemon);
      const typePokemons = await getDataPokemons(flatPokemons);
      let typePokemonsHelper = {};
      if (nameTwo) {
        const newTypePokemons = getTwoTypes(nameTwo, typePokemons);
        typePokemonsHelper = newTypePokemons;
      } else {
        (typePokemonsHelper.count = flatPokemons.length),
          (typePokemonsHelper.pokemons = typePokemons);
      }
      typePokemonsHelper.pokemons = orderPokemons(
        order,
        typePokemonsHelper.pokemons
      );
      if (offset) {
        typePokemonsHelper.pokemons = typePokemonsHelper.pokemons.slice(
          parseInt(offset),
          parseInt(offset) + 20
        );
      }
      res.json(typePokemonsHelper);
    } else {
      res.send("No hay nada mas");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/id/:id", async (req, res, next) => {
  const { id } = req.params;
  const regexUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  try {
    if (regexUUID.test(id)) {
      const pokemonDB = await Pokemon.findByPk(id);
      if (pokemonDB) res.json(pokemonDB);
    } else {
      const pokemonApi = await axios.get(`${apiUrl}/pokemon/${id}`);
      if (pokemonApi) res.json(await getDataPokemons(pokemonApi.data));
      else res.json({ message: "That pokemon does not exists" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/pokemonsDB", async (req, res, next) => {
  const { order } = req.query;
  try {
    let pokemonsDB = await Pokemon.findAll({ include: Type });
    pokemonsDB = orderPokemons(order, pokemonsDB);
    res.json({ count: pokemonsDB.length, pokemons: pokemonsDB });
  } catch (error) {
    next(error);
  }
});

router.get("/types", async (req, res, next) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  let { name, life, strength, defense, velocity, height, weight } = req.body;
  name = name.toLowerCase();
  try {
    const pokemon = await Pokemon.create({
      name,
      life,
      strength,
      defense,
      velocity,
      height,
      weight,
    });
    res.send(pokemon);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
