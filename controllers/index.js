const User = require("../models/user");
const Preference = require("../models/preference");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const isUserExists = await findUserByEmail(req.body.email);

    if (isUserExists) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    } else {
      bcrypt
        .hash(req.body.password, 10)
        .then(async function (hash) {
          try {
            await User.create({
              ...req.body,
              password: hash,
            });
            res.status(201).json({
              message: "user registered",
            });
          } catch (error) {
            res.status(500).json({
              error: error,
            });
          }
        })
        .catch((ex) => {
          new Error(ex);
        });
    }
  } catch (ex) {
    next(ex);
  }
};

async function findUserByEmail(email) {
  try {
    const result = await User.findOne({
      where: {
        email: email,
      },
      include: [
        {
          model: Preference,
          attributes: ["id", "preference_name", "preference_value"],
        },
      ],
    });
    return result;
  } catch (ex) {
    console.log("ex", ex);
    throw new Error(ex);
  }
}

const login = async (req, res, next) => {
  try {
    const userResult = await findUserByEmail(req.body.email);
    if (userResult) {
      const match = await bcrypt.compare(
        req.body.password,
        userResult.password
      );

      if (match) {
        const token = jwt.sign(
          {
            username: userResult.firstName,
            email: userResult.email,
          },
          process.env.JWTSECRETCODE,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          message: "Auth Success",
          userId: userResult.id,
          email: userResult.email,
          name: `${userResult.firstName} ${userResult.lastName}`,
          token: token,
          preferences: userResult.preferences,
        });
      } else {
        res.status(401).json({
          message: "Auth Failed | username or password incorrect",
        });
      }
    } else {
      res.status(401).json({
        message: "Auth Failed | user doesn't exists",
      });
    }
  } catch (ex) {
    res.status(500).json({
      error: ex.message,
    });
    next(ex);
  }
};

module.exports = {
  registerUser,
  login,
};
