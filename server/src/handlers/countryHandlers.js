const {
  getCountryById,
  getAllCountriesControllerDB,
  getCountryByNameController,
  fillDatabase,
} = require("../controllers/countryController");

const getAllCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const result = name
      ? await getCountryByNameController(name)
      : await getAllCountriesControllerDB();
    if (!result[0]) {
      return res.status(404).send("Pais no encontrado");
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getOneCountryHandler = async (req, res) => {
  const { idPais } = req.params;
  try {
    const country = await getCountryById(idPais);
    return res.status(200).json(country);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const fillDatabaseHandler = async(req,res) => {
  try {
    const response = await fillDatabase()
    return res.status(201).send("Base de datos en linea")
  } catch (error) {
    return res.status(503).send("Base de datos no disponible")    
  }

}

module.exports = {
  getAllCountriesHandler,
  getOneCountryHandler,
  fillDatabaseHandler
};
//Que tipo de id estoy manejando?
//Recordar que el id que estoy recibiendo por param es siempre string
//Puede que llegue un id de algo que no existe
/*const getOneCountry = async (req, res) => {
  const { idPais } = req.params;
  console.log(req.params)
  const source = isNan(id) ? "bdd" : "api";
  try {
    const country = await getCountryById(idPais, source);
    return res.status(200).json(country);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
*/
