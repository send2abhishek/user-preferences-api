const User = require("./user");
const Preference = require("./preference");

User.hasMany(Preference, {
  foreignKey: {
    name: "userId",
    field: "user_id",
    allowNull: false,
  },
});
