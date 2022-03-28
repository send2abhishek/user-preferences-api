const { DataTypes } = require("sequelize");

const { sequelize } = require("../database");

const Preference = sequelize.define(
  "preference",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    preferenceName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "preference_name",
    },
    preferenceValue: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "preference_value",
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Preference;
