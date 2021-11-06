function orderPokemons(order, array) {
  let newArray = [];
  switch (order) {
    case "nameAZ":
      newArray = array.sort(alphabetically);
      break;
    case "nameZA":
      newArray = array.sort(alphabetically).reverse();
      break;
    case "strengthAsc":
      newArray = array.sort(strength).reverse();
      break;
    case "strengthDes":
      newArray = array.sort(strength);
      break;
    default:
      newArray = array;
      break;
  }
  return newArray;
}

function alphabetically(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;
}

function strength(a, b) {
  if (a.strength < b.strength) return -1;
  if (a.strength > b.strength) return 1;
  return 0;
}

module.exports = { orderPokemons };
