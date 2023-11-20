const { DataTypes, STRING } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Country",
    {
      id: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      flags: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      subregion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      area: {
        type: DataTypes.FLOAT,
      },
      
      population: {
        type: DataTypes.INTEGER,
      },
      
      continents: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    },
      { timestamps: false }
  );
};
