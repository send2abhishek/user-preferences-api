const Sequelize = require("sequelize");
let path;

// create db instance
if (process.env.NODE_ENV === "test") {
  path = `mysql://${process.env.DATABASE_USERNAME_TEST}:${process.env.DATABASE_PASSWORD_TEST}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME_TEST}`;
} else {
  path = `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
}

const sequelize = new Sequelize(path, {
  define: {
    freezeTableName: true,
  },
  logging: false,
});

module.exports = {
  sequelize,
};
