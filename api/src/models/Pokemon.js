const { DataTypes } = require("sequelize");
const axios = require("axios");
const { apiUrl } = require("../apiUrl");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
let pkmCount = 1;

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      strength: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      velocity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async function (user) {
          const pkmsApiCount = await axios.get(apiUrl);
          user.id = pkmsApiCount.data.count + pkmCount;
          user.name = user.name.toLowerCase();
          pkmCount++;
        },
      },
    }
  );
};
