const { Router } = require("express");

const {
  getAllCountriesHandler,
  getOneCountryHandler,
  fillDatabaseHandler
} = require("../handlers/countryHandlers");

const { fillDatabase } = require("../controllers/countryController");

const countryRoutes = Router();
const verifyId= (rec, res, next)=>{
  const verifica = rec.params.idPais
  if (typeof verifica !== 'string' && verifica.length !== 3 ) {
    res.status(400).json(error.message)
  }
  next()
}

countryRoutes.get("/", getAllCountriesHandler);
countryRoutes.get("/:idPais",verifyId, getOneCountryHandler);
countryRoutes.post("/",fillDatabaseHandler)

module.exports = countryRoutes;

