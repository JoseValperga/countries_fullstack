const { Op } = require("sequelize");
const axios = require("axios");
const { Activity, Country } = require("../db");

const getActivityByNameController = async (name) => {
  const activity = await Activity.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });
  return activity.map((elemento) => {
    return elemento.dataValues;
  });
};

const getAllActivitiesController = async () => {
  const activities = await Activity.findAll();
  return activities.map((elemento) => {
    return elemento.dataValues;
  });
};

const createActivity = async (name, difficult, duration, season) => {
  const newActivity = await Activity.create({
    name,
    difficult,
    duration,
    season,
  });
  return newActivity;
};

const makeRelationship = async (id, countryId) => {
  const country = await Country.findByPk(countryId);
  const activity = await Activity.findByPk(id);
  return country.addActivity(activity)
};

module.exports = {
  createActivity,
  getActivityByNameController,
  getAllActivitiesController,
  makeRelationship,
};
