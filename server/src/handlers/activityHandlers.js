const {
  createActivity,
  getActivityByNameController,
  getAllActivitiesController,
  makeRelationship,
} = require("../controllers/activityController");

const getActivityHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const result = name
      ? await getActivityByNameController(name)
      : await getAllActivitiesController();
    if (!result[0]) {
      return res.status(404).send("Actividad no encontrada");
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postActivityHandler = async (req, res) => {
  const { name, difficult, duration, season, countryId } = req.body;

  try {
    const newActivity = await createActivity(
      name,
      difficult,
      duration,
      season
    );
    const { id } = newActivity.dataValues;
    
    const result = await makeRelationship(id, countryId);
    return res.status(201).json(newActivity);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getActivityHandler,
  postActivityHandler,
};
