const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("Pokemon", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });

      it("should throw an error if life is null", (done) => {
        Pokemon.create({ life: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid life", () => {
        Pokemon.create({ life: 120 });
      });

      it("should throw an error if life is null", (done) => {
        Pokemon.create({ strength: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid life", () => {
        Pokemon.create({ strength: 120 });
      });

      it("should throw an error if life is null", (done) => {
        Pokemon.create({ defense: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid life", () => {
        Pokemon.create({ defense: 120 });
      });

      it("should throw an error if life is null", (done) => {
        Pokemon.create({ velocity: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid life", () => {
        Pokemon.create({ velocity: 120 });
      });

      it("should throw an error if life is null", (done) => {
        Pokemon.create({ weight: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid life", () => {
        Pokemon.create({ weight: 120 });
      });

      it("should throw an error if life is null", (done) => {
        Pokemon.create({ height: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid life", () => {
        Pokemon.create({ height: 120 });
      });
    });
  });
});
