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

export function getCount() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons/count`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_COUNT", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}

export function getPokemonByName(name) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/api/pokemons?name=${name}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "GET_BY_NAME", payload: res });
      })
      .catch((err) => {
        dispatch({ type: "404_POKEMON", payload: err });
      });
  };
}
