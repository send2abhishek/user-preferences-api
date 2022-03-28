const Preference = require("../models/preference");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const findThemePrefernceByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await findThemeByUserId(userId);
    res.send(result);
  } catch (ex) {
    next(ex);
  }
};

async function findThemeByUserId(userId) {
  const result = await Preference.findOne({
    where: {
      [Op.and]: [
        { preferenceName: "theme" },
        {
          userId: userId,
        },
      ],
    },
  });

  return result;
}

const createOrUpdatePreference = async (req, res, next) => {
  try {
    const { userId, preferenceName, preferenceValue } = req.body;

    const isPrefernceExists = await findThemeByUserId(userId);

    if (isPrefernceExists) {
      const result = await Preference.update(
        {
          ...req.body,
        },
        {
          where: {
            [Op.and]: [
              { preferenceName: "theme" },
              {
                userId: userId,
              },
            ],
          },
        }
      );
      return res.status(201).json({
        message: "prefernce updated",
        result,
      });
    } else {
      const savedResult = await Preference.create({
        userId,
        preferenceName,
        preferenceValue,
      });

      return res.status(201).json({
        message: "prefernce created",
        savedResult,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findThemePrefernceByUserId,
  createOrUpdatePreference,
};
