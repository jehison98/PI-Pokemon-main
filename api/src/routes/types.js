const { default: axios } = require("axios");
const { Router } = require("express");
const { Type, Pokemon } = require("../db");
const router = Router();
const { newDataPkms } = require("../helpers/newDataPkms");
const apiUrl = "https://pokeapi.co/api/v2/type";

router.get("/", async (req, res, next) => {
  try {
    const allTypes = await Type.findAll();
    res.json(allTypes);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  id = parseInt(id);
  try {
    const typeDB = await Type.findByPk(parseInt(id));
    if (typeDB) {
      const typesPkms = await axios.get(apiUrl);
      const specificType = typesPkms.data.results.find(
        (type) => type.name === typeDB.name
      );
      const typeInfo = await axios.get(specificType.url);
      const typePkmns = await newDataPkms(typeInfo.data.pokemon, "pokemon");
      const allData = await Pokemon.findAll({
        include: [
          {
            model: Type,
            where: { id },
          },
        ],
      });
      const specificTypePkms = [...typePkmns, ...allData];
      res.json(specificTypePkms);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  res.send("I'm post from types");
  /*   const { name } = req.body;
  try {
    const newType = await Type.create({
      name,
    });
    res.status(201).send(newType);
  } catch (err) {
    next(err);
  } */
});

router.put("/", (req, res, next) => {
  res.send("I'm put from types");
});

router.delete("/", (req, res, next) => {
  res.send("I'm delete from types");
});

module.exports = router;
