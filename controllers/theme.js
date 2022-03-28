const Theme = require("../models/theme");

const fetchTheme = async (req, res, next) => {
  try {
    const result = await Theme.findAll();
    return res.send(result);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  fetchTheme,
};
