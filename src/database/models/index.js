"use strict";
import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config.js")[env];

/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @type {Sequelize}
 */
let sequelize = new Sequelize(process.env[config.use_env_variable], {
  ...config,
  pool: {
    acquire: 60000,
  },
  dialectOptions: {
    statement_timeout: 2000,
    idle_in_transaction_session_timeout: 5000,
  },
});

const db = {
  sequelize,
  Sequelize,
  admin: require("./admin.model.js")(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
