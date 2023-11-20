const { Router } = require("express");
const countryRoutes = require("./countriesRoutes")
const activityRoutes = require("./activityRoutes")
const router = Router();


router.use("/countries", countryRoutes);
router.use("/activities", activityRoutes);

module.exports = router;
