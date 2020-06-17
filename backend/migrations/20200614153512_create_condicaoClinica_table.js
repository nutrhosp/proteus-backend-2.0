
exports.up = function(knex) {
    return knex.schema.createTable("condicaoClinica", table => {
        table.increments("condicaoClinica_id").primary();
        table.string("condicaoClinica_nome");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("condicaoClinica")
};
