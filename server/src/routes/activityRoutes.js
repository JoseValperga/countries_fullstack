const { Router } = require("express");
const { getActivityHandler, postActivityHandler } = require("../handlers/activityHandlers");
const activityRoutes = Router();

activityRoutes.get("/", getActivityHandler);
activityRoutes.post("/", postActivityHandler);

module.exports = activityRoutes;
