
exports.up = function(knex) {
    return knex.schema.createTable("administrador", table => {
        table.increments("adm_id").primary();
        table.string("adm_login");
        table.string("adm_senha");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("administrador")
};
