export function getPokemons(offset) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons?offset=${offset}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMONS", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getPokemonId(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons?name=${name}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMON_ID", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getTypes() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons/types`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_TYPES", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getPokemonTypes(types, offset, order) {
  let url = `http://localhost:3001/api/pokemons/pokemonTypes?nameOne=${types[0]}&offset=${offset}&order=${order}`;
  if (types.length === 2) {
    url = url + `&nameTwo=${types[1]}`;
  }
  return function (dispatch) {
    return fetch(url)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMONS_TYPES", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getDbPokemons(order) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons/pokemonsDB?order=${order}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_POKEMONS_DB", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}
