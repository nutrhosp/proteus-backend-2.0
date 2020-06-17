
exports.up = function(knex) {
    return knex.schema.createTable("nutricionista", table => {
        table.increments("nutricionista_id").primary();
        table.string("nutricionista_nome");
        table.string("nutricionista_crm");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("nutricionista")
};
