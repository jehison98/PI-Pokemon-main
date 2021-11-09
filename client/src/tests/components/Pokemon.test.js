import React from "react";
import "@testing-library/jest-dom/";
import "@testing-library/react";
import { expect } from "chai";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, shallow } from "enzyme";
import { PokemonId } from "../../components/PokemonId/PokemonId.js";

configure({ adapter: new Adapter() });

describe("<PokemonId />", () => {
  describe("Estructura", () => {
    let wrapper;
    let store;
    const pokemon = {
      id: 34,
      name: "newPokemon",
      life: 100,
      strength: 100,
      defense: 100,
      velocity: 100,
      height: 100,
      weight: 100,
      sprite: "image.here",
      types: [
        { id: 1, name: "normal" },
        { id: 4, name: "poison" },
      ],
    };

    beforeEach(() => {
      wrapper = shallow(
        <PokemonId
          required={true}
          match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
          pokemon={pokemon}
        />
      );
    });

    it("Display name in the title", () => {
      const h1 = wrapper.find("h1");
      expect(h1.text().trim()).to.be.equal(pokemon.name);
    });
    it("Display image with the sprite and alt text", () => {
      const img = wrapper.find("img").at(0);
      expect(img.prop("src")).to.be.equal(pokemon.sprite);
      expect(img.prop("alt")).to.be.equal(pokemon.name);
    });
    it("Display name in span", () => {
      const span = wrapper.find("span").at(0);
      expect(span.text().trim()).to.be.equal(pokemon.name);
    });
    it("Display id in h5", () => {
      const h5 = wrapper.find("h5");
      expect(h5.text().trim()).to.have.string(pokemon.id);
    });
    it("Display types in span", () => {
      pokemon.types.forEach((type, index) => {
        const span = wrapper.find("span").at(index + 1);
        expect(span.text().trim()).to.be.equal(type.name);
      });
    });
    it("show list with stats", () => {
      const list = wrapper.find(".stats");
      expect(list.children()).to.have.length(4);
    });
  });
});
