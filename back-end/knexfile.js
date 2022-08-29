/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://eifyclsh:tFcp66nUPWlds3UkhCUFJON3CehRfu5d@jelani.db.elephantsql.com/eifyclsh",
  DATABASE_URL_DEVELOPMENT = "postgres://pahujfpd:3_Z2w3W5sUu63sE8tzj6Tttnc_67woyQ@jelani.db.elephantsql.com/pahujfpd",
  DATABASE_URL_TEST = "postgres://uhyowdae:Bot8ni2rMEraSqQa5QcEhkv5WeGofOu1@jelani.db.elephantsql.com/uhyowdae",
  DATABASE_URL_PREVIEW = "postgres://sceuokqv:vmr2DvbWIbJ8FwNbzWh73iKYb4xupVP0@jelani.db.elephantsql.com/sceuokqv",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
