const knex = require("knex");

const knexConfig = require("./kenxfile");

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig[ dbEnv ]);