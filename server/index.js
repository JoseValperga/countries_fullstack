//Este modulo tiene la responsabilidad de iniciar la aplicación

const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;
const { fillDatabase } = require("./src/controllers/countryController");

conn
  .sync({ alter: true })
  .then(() => {
    //con alter: true guarda las diferencias
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      fillDatabase()
    });
  })
  .catch((error) => console.error(error));
