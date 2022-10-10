const pgPromise = require("pg-promise");

const config = {
  host: "dpg-ccqvqq9gp3jm9a5svpk0-a.oregon-postgres.render.com",
  port: "5432",
  database: "Libreria",
  user: "jerxav",
  password: "fX1zHrrndAXEEzpWsjrAyOlDc0rOgYT4",
  ssl: true,
};

const configLocal = {
  host: "localhost",
  port: "5432",
  database: "Libreria",
  user: "postgres",
  password: "root",
};

const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;
