const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        beforeCreate(pokemon) {
          pokemon.name = pokemon.name.toLowerCase();
        },
      },
    }
  );
};
