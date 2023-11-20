const { Op } = require("sequelize");
const axios = require("axios");
const { Country, Activity } = require("../db");
//const Activity = require("../models/Activity");

const getCountryById = async (idPais) => {
  const { dataValues } = await Country.findByPk(idPais, {
    include: {
      model: Activity,
      attributes: ["name", "difficult", "duration", "season"],
      through: { attributes: [] }
    },
  });
  return dataValues;
};

const getCountryByNameController = async (name) => {
  const country = await Country.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Activity,
      attributes: ["name", "difficult", "duration", "season"],
      through: { attributes: [] }
    },
  });
  return country.map((elemento) => {
    return elemento.dataValues;
  });
};

const getAllCountriesController = async () => {
const { data } = await axios.get("http://localhost:5000/countries");
return data;
};

const getAllCountriesControllerDB = async () => {
  const data = await Country.findAll({include: {
    model: Activity,
    attributes: ["name", "difficult", "duration", "season"],
    through: { attributes: [] }
  }});
  return data.map((elemento) => { return elemento.dataValues})
};

const fillDatabase = async () => {
  const data = await getAllCountriesController();
  let arrayCountryData = [];
  let countryData = {};

  for (let i = 0; i < data.length; i++) {
    countryData = {
      id: data[i].cca3,
      name: data[i].name.official,
      flags: data[i].flags.png,
      capital:
        data[i].capital === undefined ? "No disponible" : data[i].capital[0],
      region: data[i].region,
      subregion:
        data[i].subregion === undefined
          ? "No disponible"
          : data[i].subregion[0],
      area: data[i].area,
      population: data[i].population,
      continents:
        data[i].continents === undefined
          ? "No disponible"
          : data[i].continents[0],
    };

    arrayCountryData.push(countryData);
  }

  await Country.bulkCreate(arrayCountryData, { ignoreDuplicates: true });
};

module.exports = {
  getAllCountriesController,
  getAllCountriesControllerDB,
  getCountryByNameController,
  getCountryById,
  fillDatabase,
};

/*
const getCountryById = async (cioc, source) => {
  console.log(cioc);
  const country =
    source === "api"
      ? (await axios.get(`http://localhost:5000/countries/${cioc}`)).data
      : await Country.findByPk(cioc);
  return country;
};
*/
/*const fillDatabase = async () => {
  try {
    const data = await getAllCountriesController();
    let arrayCountryData = [];
    let countryData = {};
    for (let i = 0; i < data.length; i++) {
      countryData = {
        id: data[i].cca3,
        name: data[i].name.official,
        flags: data[i].flags.png,
        capital:
          data[i].capital === undefined ? "No disponible" : data[i].capital[0],
        region: data[i].region,
        subregion:
          data[i].subregion === undefined
            ? "No disponible"
            : data[i].subregion[0],
        area: data[i].area,
        population: data[i].population,
        continents:
          data[i].continents === undefined
            ? "No disponible"
            : data[i].continents[0],
      };
      arrayCountryData.push(countryData);
    }
    await Country.bulkCreate(arrayCountryData, { ignoreDuplicates: true });
    console.log("Datos insertados en la base de datos con éxito.");
  } catch (error) {
    console.error("Error al insertar datos en la base de datos", error);
  }
};*/
