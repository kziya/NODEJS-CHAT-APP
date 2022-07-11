const expressSession = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(expressSession);

module.exports = new mongoDbSession({
  uri: process.env.DB_STRING,
  databaseName: process.env.DB_NAME,
  collection: process.env.DB_COLLECTION_NAME,
});
