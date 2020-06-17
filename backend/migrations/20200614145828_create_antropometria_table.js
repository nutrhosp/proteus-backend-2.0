
exports.up = function(knex) {
    return knex.schema.createTable("antropometria", table => {
        table.increments("antropometria_id").primary();
        table.integer("avaliacao_id").unsigned();
        table.foreign("avaliacao_id").references("avaliacao_id").inTable("avaliacao").onDelete('CASCADE').onUpdate('CASCADE');
        table.decimal("antropometria_altura");
        table.decimal("antropometria_pesoUsual");
        table.decimal("antropometria_pesoAtual");
        table.string("antropometria_descricaoPesoAtual");
        table.string("antropometria_descricaoPP");
        table.integer("antropometria_dinamometria");
        table.integer("antropometria_circunferenciaPanturrilha");
        table.integer("antropometria_ambc");
        table.integer("antropometria_cabd");
        table.decimal("antropometria_pp");
        table.decimal("antropometria_imc");

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("antropometria")
};
