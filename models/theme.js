const { DataTypes } = require("sequelize");

const { sequelize } = require("../database");

const Theme = sequelize.define(
  "theme",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "value",
    },
  },
  {
    timestamps: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Theme;
