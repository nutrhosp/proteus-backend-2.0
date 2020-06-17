
exports.up = function(knex) {
    return knex.schema.createTable("exameFisico", table => {
        table.increments("exameFisico_id").primary();
        table.string("exameFisico_nome");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("exameFisico")
};
