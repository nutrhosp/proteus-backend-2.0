
exports.up = function(knex) {
    return knex.schema.createTable("avaliacao", table => {
        table.increments("avaliacao_id").primary();
        table.integer("paciente_id").unsigned();
        table.integer("nutricionista_id").unsigned();
        table.foreign("paciente_id").references("paciente_id").inTable("paciente").onDelete('CASCADE').onUpdate('CASCADE');
        table.foreign("nutricionista_id").references("nutricionista_id").inTable("nutricionista").onDelete('CASCADE').onUpdate('CASCADE');
        table.string("avaliacao_situacao");
        table.string("avaliacao_conduta");
        table.boolean("avaliacao_riscoNutricional");
        table.integer("avaliacao_t");
        table.integer("avaliacao_m");
        table.integer("avaliacao_n");
        table.integer("avaliacao_g");
        table.date("avaliacao_dataPaciente");
        table.date("avaliacao_dataMedico");
        table.string("avaliacao_acompanhante");
        table.string("avaliacao_diagnostico");
        table.string("avaliacao_tratamento");
        table.string("avaliacao_alergia");
        table.string("avaliacao_atividadeFisica");
        table.string("avaliacao_ritmoUrinario");
        table.string("avaliacao_ritmoIntestino");
        table.string("avaliacao_estadiamento");
        table.string("avaliacao_exame");
        table.string("avaliacao_medicamento");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("avaliacao")
};
