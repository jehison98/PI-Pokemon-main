const { Router } = require("express");
const { Type } = require("../db");
const router = Router();
const { apiUrl } = require("../apiUrl");


router.get("/", async (req, res, next) => {
  const allTypes = await Type.findAll();
  res.send(allTypes);
});

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    const newType = await Type.create({
      name,
    });
    res.status(201).send(newType);
  } catch (err) {
    next(err);
  }
});

router.put("/", (req, res, next) => {
  res.send("I'm put from types");
});

router.delete("/", (req, res, next) => {
  res.send("I'm delete from types");
});

module.exports = router;
