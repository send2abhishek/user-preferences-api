const Joi = require("joi");
const { isEmpty } = require("../utils/");

const validateRegister = (req, res, next) => {
  if (checkBody(req.body)) {
    res.status(400).json({
      error: "empty body",
    });
    return;
  }

  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).max(3000).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(2).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    next();
  }
};

const validateLogin = (req, res, next) => {
  if (checkBody(req.body)) {
    res.status(400).json({
      error: "empty body",
    });
    return;
  }

  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(2).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    next();
  }
};

const validatePerefernces = (req, res, next) => {
  if (checkBody(req.body)) {
    res.status(400).json({
      error: "empty body",
    });
    return;
  }

  const schema = Joi.object({
    preferenceName: Joi.string().min(2).required(),
    preferenceValue: Joi.string().min(2).max(3000).required(),
    userId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({
      error: error.message,
    });
  } else {
    next();
  }
};

function checkBody(payload) {
  return payload && isEmpty(payload);
}

module.exports = {
  validateRegister,
  validateLogin,
  validatePerefernces,
};
