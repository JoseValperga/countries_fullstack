const { DataTypes, STRING } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Activity", {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    difficult: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    duration: {
      type: DataTypes.STRING,
    },

    season: {
      type: DataTypes.ENUM("Spring", "Summer", "Autumn", "Winter"),
      allowNull: false,
    },

  },{timestamps:false});
};
