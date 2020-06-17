const config = require("../knexfile");
const knex = require("knex")(config);
const bodyparser = require('body-parser');
const cors = require('cors');

knex.migrate.latest([config]);
module.exports = app => {
    app.use(bodyparser.json())
    app.use(cors())
    knex
}