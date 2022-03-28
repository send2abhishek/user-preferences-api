// import modules
const express = require("express");
const route = express.Router();

const {
  validateRegister,
  validateLogin,
  validatePerefernces,
} = require("../middlewares/validateRequests");

const {
  findThemePrefernceByUserId,
  createOrUpdatePreference,
} = require("../controllers/preference");

const { authCheck } = require("../middlewares/validateAuth");
const { registerUser, login } = require("../controllers/");
const { fetchTheme } = require("../controllers/theme");

route.post("/register", validateRegister, registerUser);
route.post("/login", validateLogin, login);
route.get("/themes", authCheck, fetchTheme);
route.get("/preference/theme/:userId", authCheck, findThemePrefernceByUserId);
route.put(
  "/preference/theme/",
  authCheck,
  validatePerefernces,
  createOrUpdatePreference
);

module.exports = route;
