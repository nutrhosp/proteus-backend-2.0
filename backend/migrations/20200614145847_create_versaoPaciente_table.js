
exports.up = function(knex) {
    return knex.schema.createTable("versaoPaciente", table => {
        table.increments("versaoPaciente_id").primary();
        table.integer("avaliacao_id").unsigned();
        table.foreign("avaliacao_id").references("avaliacao_id").inTable("avaliacao").onDelete('CASCADE').onUpdate('CASCADE');
        table.decimal("versaoPaciente_q1PesoAtual");
        table.decimal("versaoPaciente_q1PesoMes");
        table.decimal("versaoPaciente_q1PesoSemestre");
        table.integer("versaoPaciente_q1Tamanho");
        table.string("versaoPaciente_q2Quantidade");
        table.string("versaoPaciente_q2Tipo");
        table.string("versaoPaciente_q2Dor");
        table.string("versaoPaciente_q2Outro");
        table.integer("versaoPaciente_quadro1");
        table.integer("versaoPaciente_quadro2");
        table.integer("versaoPaciente_quadro3");
        table.integer("versaoPaciente_quadro4");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("versaoPaciente")
};
