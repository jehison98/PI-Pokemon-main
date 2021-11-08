/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "newPokemon",
  life: 100,
  strength: 100,
  defense: 100,
  velocity: 100,
  height: 100,
  weight: 100,
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/api/pokemons").expect(200));
    it("should get 200 with name in query from api", () =>
      agent.get("/api/pokemons?name=Charizard").expect(200));
    it("should get 200 with name in query from DB", () =>
      agent.get("/api/pokemons?name=newPokemon").expect(200));
    it("should be an obejct", () =>
      agent
        .get("/api/pokemons")
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.an("object");
        }));
  });
  it("should contain pokemons array", () =>
    agent
      .get("/api/pokemons")
      .expect(200)
      .then((response) => {
        expect(response.body.pokemons).to.be.an("array");
      }));
  it("should contain an object when search by name", () =>
    agent
      .get("/api/pokemons?name=Charizard")
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.an("object");
      }));
  it("should contain name when search by name", () => {
    const name = "charizard";
    agent
      .get("/api/pokemons?name=" + name)
      .expect(200)
      .then((response) => {
        expect(response.body.name).to.be.equal(name);
      });
  });
  it("should contain name when search by name", () =>
    agent
      .get("/api/pokemons?name=Charizard")
      .expect(200)
      .then((response) => {
        expect(response.body)
          .to.be.an("object")
          .that.has.all.keys(
            "id",
            "name",
            "life",
            "strength",
            "defense",
            "velocity",
            "height",
            "weight",
            "sprite",
            "types"
          );
      }));
});
